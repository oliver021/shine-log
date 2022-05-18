/**
 * @function parseFormat
 * @description Parses a format string using the provided data
 * @param {string} format
 * @param {any[]} data
 * @returns {string}
 */
export function parseFormat(format: string, data: any[]): string
{
    let result: string = format;

    // string may be: "elm {0} {1:00} {2:0.00}"
    // data may be: ["text", 3321, 0.1234]
    // result will be: "elm text 33 0.12"

    // replace: {0} {1:b} ${2:000.00}
    // data may be: ["text", 7, 20.111]
    // result will be: "text 0111 820.11"

    // replace: {0} {1:b} ${2:f}
    // data may be: ["text", 8, 20.111]
    // result will be: "text 1000 20.11"

    // replace: {0:upper} {1:b} ${2:f}
    // data may be: ["text", 8, 20.111]
    // result will be: "TEXT 1000 20.11"

    // replace: {0:lower} {14:b}
    // data may be: ["teXt", 82]
    // result will be: "text 100010"

    // replace: {0:yyyy-MM-dd} {1:hex}
    // data may be: [new Date, 16]
    // result will be: "2018-01-01 f"

    // replace: {0:yyyy-MM->hh } {1:hex} // "hex" mean hexadecimal
    // data may be: [new Date, 18]
    // result will be: "2018-01->00 f2"

    // replace: {0:yyyy-MM->hh } {1:hex} // "hex" mean hexadecimal
    // data may be: [new Date, 19]
    // result will be: "2018-01->00 f3"
    

    let regex: RegExp = /\{[\s\S]*?\}/g;
    let match: RegExpExecArray | null;
    let parameters: PFormat[] = [];
    while(null !== (match = regex.exec(format))){
        parameters.push(getFormatParameter(match[0]));
    }

    for (let p of (parameters)){
        result = result.replace(p.src, resolve(p))
    }

    function getFormatParameter(match: string): PFormat
    {
        
        let chunk = (match.substring(1,match.length-1).split(":"));
        let index: number = Number(chunk[0]);
        let format = chunk.length > 1 ? chunk[1] : "";
        return { index, format, src: match };
    }

    function resolve(arg: PFormat){
        return data[arg.index];
    }

    return result;
}

type PFormat = { index: number, format: string, src: string };

/**
 * @function parseTemplate
 * @description Parses a template string using the provided 
 * data key-value and replaces the keys with the values using %key%
 * @param {string} template
 * @param {{[key:string]:any}} data
 * @returns {string}
 * @example
 * parseTemplate("Hello %name%", { name: "John" });
 * // returns "Hello John"
 */
export function parseTemplate(template: string, data: { [key: string]: any }): string
{
    let result: string = template;

    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            let value: any = data[key];
            if (value != null)
            {
                result = result.replace("%" + key + "%", value);
            }
        }
    }

    return result;
}