let log = require('log4js').getLogger();

module.exports = class Log {

    constructor(header) {
        this.header = header;
    };
    setHeader(header) {
        this.header = header;
    };
    debug(t) {
        let h = (this.header != undefined ? this.header : "");
        log.debug(h + t);


    };
    info(t) {
        let h = (this.header != undefined ? this.header : "");
        log.info(h + t);

    };
    error(t) {
        let h = (this.header != undefined ? this.header : "");
        log.error(h + t);

    };
    static getLog(header) {
        return new Log(header);
    }

}