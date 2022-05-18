import { LOG_LEVEL } from "./levels";

/**
 * @interface LogOptions
 * @description Log options
 */
export interface LogOptions {
    /**
     * @property level {LOG_LEVEL}
     * @description The log level
     */
    level: LOG_LEVEL;

    /**
     * @property template {string}
     * @description The log template
     * @default {%level% %message%}
     * @example {%level%: %message%}
     */
    template: string;
    
}

/**
 * @interface LogConsoleOptions
 * @description The log console options
 * @extends LogOptions
 */
export interface LogConsoleOptions extends LogOptions {
    /**
     * @property colorDebug {string}
     * @description The debug color
     */
    colorDebug: string;

    /**
     * @property colorInfo {string}
     * @description The info color
     * @default {#00ff00}
     */
    colorInfo: string;

    /**
     * @property colorWarn {string}
     * @description The warn color
     * @default {#ff9900}
     */
    colorWarn: string;

    /**
     * @property colorError {string}
     * @description The error color
     * @default {#ff0000}
     */
    colorError: string;

    /**
     * @property colorFatal {string}
     * @description The fatal color
     * @default {#ff0000}
     */
    colorFatal: string;
}

/**
 * @interface LogFile
 * @description The log file class options
 */
export interface LogFileOptions extends LogOptions {
    /**
     * @property path {string}
     * @description The log file path
     * @example ./logs/log.log
     */
    path: string;

    /**
     * @property rolling {boolean}
     * @description The log file rolling
     * @default false
     */ 
     rolling: boolean;
     
    /**
    * @property maxSize {number}
    * @description The log file max size
    * @default 10485760
    */
    maxSize: number;

    /**
     * @property rollingDays {number}
     * @description The log file rolling days
     * @default 7
     */
    rollingDays: number;
}

/**
 * @interface
 * @description The log class
 */
export interface LogDatabase {

    /**
     * @property file {string}
     * @description The log file
     */
    file: string;

    /**
     * @property console {boolean}
     * @description The log console
     */
    console: boolean;
    
    /**
     * @property database {boolean}
     * @description The log database
     */
    database: boolean;

    /**
     * @property db {string}
     * @description The log database name
     */
    db: string;

    /**
     * @property db_host {string}
     * @description The log database host
     */
    db_host: string;

    /**
     * @property db_user {string}
     * @description The log database user
     */
    db_user: string;
    
    /**
     * @property db_password {string}
     * @description The log database password
     */
    db_password: string;

    /**
     * @property db_port {number}
     * @description The log database port
     * @default 3306
     */
    db_port: number;

    /**
     * @property db_table {string}
     * @description The log database table
     * @default log
     * @default log_info
     */
    db_table: string;

    /**
     * @property db_column {string}
     * @description The log database column
     * @default log
     * @default log_info
     */
    db_column: string;
}


/**
 * @interface LogHttpOptions
 * @description The log http options
 * @extends LogOptions
 */
export interface LogHttpOptions extends LogOptions {
    /**
     * @property url {string}
     * @description The log http url
     * @example http://localhost:3000/log
     */
    url: string;

    /**
     * @property method {string}
     * @description The log http method
     * @default POST
     */
    method: string;

    /**
     * @property headers {object}
     * @description The log http headers
     * @example {'Content-Type': 'application/json'}
     */
    headers: object;

    /**
     * @property appendBodyRequest {object}
     * @description The log http extra content for request
     * @example {'Content-Type': 'application/json'}
     */
     appendBodyRequest: object;
}

/**
 * @interface LogEmailOptions
 * @description The log email options
 * @extends LogOptions
 */
export interface LogEmailOptions extends LogOptions {
    /**
     * @property to {string}
     * @description The log email to
     */
    to: string;

    /**
     * @property from {string}
     * @description The log email from
     * @default noreply@localhost
     */
    from: string;

    /**
     * @property subject {string}
     * @description The log email subject
     * @default Log
     */
    subject: string;
}

/**
 * @interface LogSlackOptions
 * @description The log slack options
 * @extends LogOptions
 */
export interface LogSlackOptions extends LogOptions {
    /**
     * @property webhook {string}
     * @description The log slack webhook
     */
    webhook: string;

    /**
     * @property channel {string}
     * @description The log slack channel
     * @default #general
     * @example #general
     */
    channel: string;

    /**
     * @property username {string}
     * @description The log slack username
     * @default Log
     */
    username: string;

    /**
     * @property icon_emoji {string}
     * @description The log slack icon emoji
     * @default :ghost:
     */
    icon_emoji: string;

    /**
     * @property icon_url {string}
     * @description The log slack icon url
     * @example https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon
     */
    icon_url: string;
}

/**
 * @interface LogSeqOptions
 * @description The log seq options
 * @extends LogOptions
 */
export interface LogSeqOptions extends LogOptions {
    /**
     * @property url {string}
     * @description The log seq url
     * @example http://localhost:8080
     */
    url: string;

    /**
     * @property app {string}
     * @description The log seq app
     * @default log
     */
    app: string;
}

/**
 * @interface LogsStashOptions
 * @description The log stash options
 * @extends LogOptions
 */
export interface LogsStashOptions extends LogOptions {
    /**
     * @property url {string}
     * @description The log stash url
     * @example http://localhost:8080
     */
    url: string;

}