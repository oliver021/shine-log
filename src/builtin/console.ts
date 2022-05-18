import { ILoggerDriver, LogConsoleOptions } from "../index";
import { LOG_LEVEL } from "../levels";

/**
 * Console logger driver
 * @class ConsoleLoggerDriver
 * @implements {ILoggerDriver}
 * @export
 */
export class ConsoleLoggerDriver implements ILoggerDriver {

    public get options(): LogConsoleOptions {
        return this._options;
    }

    // constructor for console options
    constructor(private _options: LogConsoleOptions) {
    }

    /**
     * Logs a message
     * @param {string} message
     * @param {LogOptions} options
     * @memberof ConsoleLoggerDriver
     */
    public log(level: LOG_LEVEL, message: string): void {
        if (this._options.level >= level) {
            // switch for each log level to get the correct color
            switch (level) {
                case LOG_LEVEL.DEBUG:
                    console.log(message);
                    break;
                case LOG_LEVEL.INFO:
                    console.info(message);
                    break;
                case LOG_LEVEL.WARN:
                    console.warn(message);
                    break;
                case LOG_LEVEL.ERROR:
                case LOG_LEVEL.FATAL:
                case LOG_LEVEL.EMERGENCY:
                    console.error(message);
                    break;

                default:
                    throw new Error("Invalid log level");
        }
    }
}

    /**
     * Logs a message
     * @param {string} message
     * @param {LogOptions} options
     * @memberof ConsoleLoggerDriver
     * @deprecated
     * @see {@link ConsoleLoggerDriver#log}
     * @see {@link ILoggerDriver#log}
     * @see {@link LogOptions}
     */
    public logAsync(level: LOG_LEVEL, message: string): Promise<void> {
        // non async support for console
        this.log(level, message);
        return Promise.resolve();
    }
}