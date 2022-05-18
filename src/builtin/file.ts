import  *  as fsSync from "node:fs";
import  *  as fs from "node:fs/promises";
import { ILoggerDriver, LogFileOptions } from "../index";
import { LOG_LEVEL } from "../levels";

/**
 * File logger driver
 * @class FileLoggerDriver
 * @implements {ILoggerDriver}
 * @export
 */
export class FileLoggerDriver implements ILoggerDriver {
    
        public get options(): LogFileOptions {
            return this._options;
        }
    
        // constructor for file options
        constructor(private _options: LogFileOptions) {
        }

        /**
         * Logs a message
         * @param {string} message
         * @param {LogOptions} options
         * @memberof FileLoggerDriver
         * @returns {void}
         */
        public log(level: LOG_LEVEL, message: string): void {
            // if the log level is less than the current log level
            // then go to the next driver
            if(this._options.level < level){
                return;
            }

            if(this._options.rolling){
                // get the file creation date
                const file = fsSync.statSync(this._options.path);
                const fileCreationDate = file.birthtime;
                // if the file is outdated base days diffrence
                if(fileCreationDate.getTime() 
                + (this._options.rollingDays * 24 * 60 * 60 * 1000) < new Date().getTime()){
                    // rename the file
                    fsSync.renameSync(this._options.path, this._options.path + '.' + fileCreationDate.getTime());
                    // create new file with the same path
                    fsSync.writeFileSync(this._options.path, '');
                }
                // if the file is not outdated but is the file size is bigger than max size
                // then rename the file with current date
                if(file.size > this._options.maxSize){
                    fsSync.renameSync(this._options.path, this._options.path + '.' + new Date().getTime());
                    fsSync.writeFileSync(this._options.path, '');
                }
            }
                
            // open the file and write the message
            // using fs.appendFileSync
            fsSync.appendFileSync(this._options.path, message);
        }

        /**
         * Logs a message asynchronously
         * @param {string} message
         * @param {LogOptions} options
         * @memberof FileLoggerDriver
         * @returns {Promise<void>}
         * @async
         */
        public async logAsync(level: LOG_LEVEL, message: string): Promise<void> {
            // if the log level is less than the current log level
            if(this._options.level < level){
                return;
            }

            if(this._options.rolling){
                // get the file creation date
                const file = await fs.stat(this._options.path);
                const fileCreationDate = file.birthtime;
                // if the file is outdated base days diffrence
                if(fileCreationDate.getTime() 
                + (this._options.rollingDays * 24 * 60 * 60 * 1000) < new Date().getTime()){
                    // rename the file
                    await fs.rename(this._options.path, this._options.path + '.' + fileCreationDate.getTime());
                    // create new file with the same path
                    await fs.writeFile(this._options.path, '');
                }

                // if the file is not outdated but is the file size is bigger than max size
                // then rename the file with current date
                if(file.size > this._options.maxSize){
                    await fs.rename(this._options.path, this._options.path + '.' + new Date().getTime());
                    await fs.writeFile(this._options.path, '');
                }
            }

            // open the file and write the message
            // using fs.appendFileSync
            await fs.appendFile(this._options.path, message);

        }
    }