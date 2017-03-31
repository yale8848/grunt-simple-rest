let request = require('request');


module.exports = class HttpUtils {

    constructor(context) {
        this.context = context;
        this.log = require('./LogUtils.js').getLog(context.url + " : ");
    };
    get(context) {
        let _this = this;
        return new Promise((res, rej) => {
            _this.log.info("start");
            request({ method: 'GET', uri: context.url, timeout: 5000 }, function(error, response, body) {
                if (error) {
                    _this.log.error(error.toString());
                    if (context.interrupt) {
                        process.exit(1);
                    } else {

                        rej(error);
                    }
                } else {

                    _this.log.info("result : \r\n" + body);

                    try {
                        let b = JSON.parse(body);
                        if (b.success) {
                            res({ success: true, data: body });
                        } else {
                            res({ success: false, data: body });
                        }
                    } catch (e) {
                        res({ success: false, data: '' });
                    }
                }

            });

        });

    };

    sleep(t) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, t);
        });

    };
    getSync() {
        let context = this.context;
        let _this = this;
        return new Promise((res, rej) => {
            _this.log.info(" after " + _this.context.timeout + " ms start");
            setTimeout(() => {

                (async() => {
                    let ret = {};
                    for (let i = 0; i < context.count; i++) {
                        try {
                            ret = await _this.get(context);
                            await _this.sleep(context.timeGap);
                            if (ret.success) {
                                res(ret);
                                return;

                            }
                        } catch (error) {

                        }
                    }
                    res(ret);

                })();


            }, context.timeout);
        });
    };

}