import { ILoggerDriver, LogHttpOptions } from "../index";
import { LOG_LEVEL } from "../levels";
import { Axios } from 'axios'

/**
 * Http logger driver
 * @class HttpLoggerDriver
 * @implements {ILoggerDriver}
 * @export
 * @see {@link ILoggerDriver}
 */
export class HttpLoggerDriver implements ILoggerDriver {
    
        public get options(): LogHttpOptions {
            return this._options;
        }

        private axios: Axios;
    
        // constructor for http options
        constructor(private _options: LogHttpOptions) {
            this.axios = new Axios({
                baseURL: this._options.url,
                timeout: 1000,
                headers: {'Content-Type': 'application/json', ...this._options.headers}
            });
        }

        /**
         * Logs a message
         * @param {LOG_LEVEL} level
         * @param {string} message
         * @memberof HttpLoggerDriver
         * @returns {void}
         * @see {@link ILoggerDriver#log}
         * @see {@link LOG_LEVEL}
         */
        public log(level: LOG_LEVEL, message: string): void {
            if (this._options.level >= level) {
                // switch for each log level to get the correct color
                // send http request by axios
                this.buildHttpRequest(level, message)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }

        /**
     * Logs a message asynchronously
     * @param {LOG_LEVEL} level
     * @param {string} message
     * @memberof HttpLoggerDriver
     */
    public logAsync(level: LOG_LEVEL, message: string): Promise<void> {
        // send http request by axios async
        return this.buildHttpRequest(level, message);
    }

    /**
     * Builds the http request
     * @param {LOG_LEVEL} level
     * @param {string} message
     * @memberof HttpLoggerDriver
     * @returns {Promise<void>}
     * @see {@link LOG_LEVEL}
     * @access private
     */
    private buildHttpRequest(level: LOG_LEVEL, message: string): Promise<void> {
        return this.axios.post('', {
            level: level,
            message: message,
            timestamp: new Date().toISOString(),
            ...this._options.appendBodyRequest
        });
    }
}
