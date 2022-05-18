import { LOG_LEVEL } from "./levels";
import { LogOptions } from "./logs.options";
import { parseTemplate } from "./util";
export *  from "./logs.options"
export *  from "./levels"

/**
 * @interface ILogger
 * @description ILoggerDriver interface is a contract for a logger driver
 */
export interface ILoggerDriver
{
	/**
	 * @property {ILoggerOptions} options
	 */
	 get options(): LogOptions;

	/**
	 * @method log
	 * @descripton Logs a message to the console
	 * @param {string} message
	 * @param {LOG_LEVEL} level
	 */
	 log(level: LOG_LEVEL, message: string): void;

	/**
	 * @method logAsync
	 * @descripton Logs a message to the console asynchronously
	 * @param {string} message
	 * @param {LOG_LEVEL} level
	 * @returns {Promise<void>}
	 * @async
	 */
	 logAsync(level: LOG_LEVEL, message: string): Promise<void>;
}

/**
 * @class Logger
 * @implements ILoggerDriver
 * @description Logger class to log messages
 * @author Oliver Valiente @oliver021
 * @see github.com/oliver021/shine-logs
 * @example
 * const logger = new Logger();
 * logger.log(LOG_LEVEL.INFO, "Hello World");
 */
export class Logger
{
	/**
	 * @param {LOG_LEVEL} level
	 * @memberof Logger
	 */
	private _loggers: Map<LOG_LEVEL, ILoggerDriver[]> = new Map<LOG_LEVEL, ILoggerDriver[]>();

	/**
	 * @param {{ [key:string]: any }} context
	 * @memberof Logger
	 */
	private context: { [key:string]: any } = {};

	/**
	 * @method log
	 * @desc Logs a message to all loggers
	 * @param {LOG_LEVEL} level
	 * @param {string} message
	 * @memberof Logger
	 * @returns {void}
	 * @public
	 * @instance
	 * @async
	 */
	public log(level: LOG_LEVEL, message: string): void
	{
		// parse and render template with very simple way
		message = this.render(message, level);
		
		if (this._loggers.has(level))
		{
			this._loggers.get(level)?.forEach(logger => logger.log(level, message));
		}
	}

	private render(message: string, level: LOG_LEVEL) {
		message = parseTemplate(message, {
			message: message,
			level: level,
			...this.context
		});
		return message;
	}

	/**
	 * @async
	 * @method logAsync
	 * @param level
	 * @param message
	 * @returns {Promise<void>}
	 * @memberof Logger
	 * @description Logs the message asynchronously
	 * @example
	 * logger.logAsync(LOG_LEVEL.INFO, "Hello World!");
	 * logger.logAsync(LOG_LEVEL.WARN, "Hello World!");
	 */
	public async logAsync(level: LOG_LEVEL, message: string): Promise<void>
	{
		// parse and render template with very simple way
		message = this.render(message, level);
		
		if (this._loggers.has(level))
		{
			var promises = this._loggers.get(level)
			?.map( logger => logger.logAsync(level, message)) as Promise<void>[];
			for (let promise of promises)
			{
				await promise;
			}
		}
	}

	/**
	 * @method addLogger
	 * @description Adds a logger to the logger
	 */
	public addLogger(logger: ILoggerDriver): void
	{
		if (!this._loggers.has(logger.options.level))
		{
			this._loggers.set(logger.options.level, []);
		}
		this._loggers.get(logger.options.level)?.push(logger);
	}

	/**
	 * @method removeLogger
	 * @description Removes a logger from the logger
	 * @param {ILoggerDriver} logger
	 * @returns {boolean}
	 */
	public removeLogger(logger: ILoggerDriver): boolean
	{
		if (this._loggers.has(logger.options.level))
		{
			var loggers = this._loggers.get(logger.options.level);
			var index = loggers?.indexOf(logger);
			if (index !== undefined && index !== -1)
			{
				loggers?.splice(index, 1);
				return true;
			}
		}
		return false;
	}

	/**
	 * @method debug
	 * @description Logs a debug message
	 * @param {string} message
	 * @memberof Logger
	 * @returns {void}
	 */
	public debug(message: string): void
	{
		this.log(LOG_LEVEL.DEBUG, message);
	}

	/**
	 * @method info
	 * @description Logs an info message
	 * @param {string} message
	 * @memberof Logger
	 * @returns {void}
	 */
	public info(message: string): void
	{
		this.log(LOG_LEVEL.INFO, message);
	}

	/**
	 * @method warn
	 * @description Logs a warn message
	 * @param {string} message
	 * @memberof Logger
	 * @returns {void}
	 */
	public warn(message: string): void
	{
		this.log(LOG_LEVEL.WARN, message);
	}

	/**
	 * @method error
	 * @description Logs an error message
	 * @param {string} message
	 * @memberof Logger
	 * @returns {void}
	 * @async
	 * @public
	 * @instance
	 * @example
	 * logger.error("Hello World!");
	 */
	public error(message: string): void
	{
		this.log(LOG_LEVEL.ERROR, message);
	}

	/**
	 * @method critical
	 * @description Logs a critical message
	 * @param {string} message
	 * @memberof Logger
	 * @returns {void}
	 */
	public fatal(message: string): void
	{	
		this.log(LOG_LEVEL.FATAL, message);
	}

	/**
	 * @method debugAsync
	 * @description Logs a debug message asynchronously
	 * @param {string} message
	 * @returns {Promise<void>}
	 * @memberof Logger
	 * @public
	 * @instance
	 * @async
	 * @example
	 * logger.debugAsync("Hello World!");
	 */
	public debugAsync(message: string): Promise<void>
	{
		return this.logAsync(LOG_LEVEL.DEBUG, message);
	}

	/**
	 * @method infoAsync
	 * @description Logs an info message asynchronously
	 * @param {string} message
	 * @returns {Promise<void>}
	 * @memberof Logger
	 * @public
	 * @instance
	 * @async
	 * @example
	 * logger.infoAsync("Hello World!");
	 */
	 public infoAsync(message: string): Promise<void>
	 {
		return this.logAsync(LOG_LEVEL.INFO, message);
	 }

	/**
	 * @method warnAsync
	 * @description Logs a warn message asynchronously
	 * @param {string} message
	 * @returns {Promise<void>}
	 * @memberof Logger
	 * @public
	 * @instance
	 * @async
	 * @example
	 * logger.warnAsync("Hello World!");
	 */
	public warnAsync(message: string): Promise<void>
	{
		return this.logAsync(LOG_LEVEL.WARN, message);
	}

	/**
	 * @method errorAsync
	 * @description Logs an error message asynchronously
	 * @param {string} message
	 * @returns {Promise<void>}
	 * @memberof Logger
	 * @public
	 * @instance
	 * @async
	 * @example
	 * logger.errorAsync("Hello World!");
	 */
	public errorAsync(message: string): Promise<void>
	{
		return this.logAsync(LOG_LEVEL.ERROR, message);
	}

	/**
	 * @method fatal
	 * @description Logs a critical message asynchronously
	 * @param {string} message
	 * @returns {Promise<void>}
	 * @memberof Logger
	 * @public
	 * @instance
	 * @async
	 * @example
	 * logger.fatal("Hello World!");
	 */
	public fatalAsync(message: string): Promise<void>
	{
		return this.logAsync(LOG_LEVEL.FATAL, message);
	}

	/**
	 * @method stream
	 * @description sends a stream to the logger
	 * @param {{level: LOG_LEVEL, message: string}[]} level
	 * @returns void
	 * @memberof Logger
	 * @public
	 * @instance
	 */
	public stream(level: {level: LOG_LEVEL, message: string}[]): void
	{
		for (let log of level)
		{
			this.log(log.level, log.message);
		}
	}

	/**
	 * @method streamAsync
	 * @description sends a stream to the logger asynchronously
	 * @param {{level: LOG_LEVEL, message: string}[]} level
	 * @returns Promise<void>
	 * @memberof Logger
	 * @public
	 * @instance
	 * @async
	 * @example
	 * logger.streamAsync([{level: LOG_LEVEL.DEBUG, message: "Hello World!"}]);
	 */
	public streamAsync(level: {level: LOG_LEVEL, message: string}[]): Promise<void>
	{
		// build a promise from stream
		return new Promise((resolve, reject) =>
		{
			// using try catch to prevent the promise from being rejected
			try	
			{
				for (let log of level)
				{
					this.log(log.level, log.message);
				}

				// pass the resolve to the next promise
				resolve();
			} catch(err){
				// this block is executed when an exception is thrown
				reject(err);
			}
		}
		);
	}

	private renderMessage(msg: string, args: any[], context: {[key:string]: any}){
		
	}
}