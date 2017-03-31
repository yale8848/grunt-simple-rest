/*
 * grunt-simple-rest
 * https://github.com/yale8848/grunt-simple-rest.git
 *
 * Copyright (c) 2017 yale8848
 * Licensed under the MIT license.
 */


let HttpUtils = require('../lib/HttpUtils');
let log = require('../lib/LogUtils').getLog();


module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('simple_rest', 'grunt simple rest http utils', function() {

        let data = this.data;
        let contexts = [];
        if (data.url == undefined) {
            log.error("not find url");
            process.exit(1);
            return;

        }
        if (typeof data.url == 'object' && data.url.constructor == Array) {
            for (let i in data.url) {

                if (/^http/.test(data.url[i])) {
                    let context = JSON.parse(JSON.stringify(data));
                    context.url = data.url[i];
                    contexts.push(context);
                } else {

                    if (data.hosts == undefined) {
                        log.error("not find hosts");
                        process.exit(1);
                        return;
                    }

                    if (typeof data.hosts == 'string') {
                        let context = JSON.parse(JSON.stringify(data));
                        context.url = data.hosts + data.url[i];
                        contexts.push(context);
                    } else if (typeof data.hosts == 'object' && data.hosts.constructor == Array) {

                        for (let j in data.hosts) {
                            let context = JSON.parse(JSON.stringify(data));
                            context.url = data.hosts[j] + data.url[i];
                            contexts.push(context);
                        }

                    }

                }
            }


        }

        if (data.async == undefined) {
            data.async = true;
        }
        let defaultValue = (context) => {
            context.interrupt = (context.interrupt == undefined ? false : context.interrupt);
            context.count = (context.count == undefined ? 5 : context.count);
            context.timeout = (context.timeout == undefined ? 2000 : context.timeout);
            context.timeGap = (context.timeGap == undefined ? 2000 : context.timeGap);
            context.protocol = (context.protocol == undefined ? 'http' : context.protocol);

            if (!/^http/.test(context.url)) {
                context.url = (context.protocol + '://' + context.url);
            }
            return context;
        };

        let resultLog = (result, contexts, done) => {
            if (result.length == contexts.length) {
                console.log("======================result======================");

                let s = 0;
                for (let j in result) {
                    if (result[j].success) {
                        s++;
                    }
                }
                console.log("+++++++++ total: " + result.length + "; success: " + s + "; fail: " + (result.length - s) + " +++++++++");
                for (let j in result) {

                    if (result[j].success) {
                        log.info(JSON.stringify(contexts[j].url) + " | success | " + JSON.stringify(result[j]));
                    } else {
                        log.error(JSON.stringify(contexts[j].url) + " | error | " + JSON.stringify(result[j]));
                    }
                }
                console.log("======================result======================");

                if (done != undefined) {
                    done(true);
                }
            }
        }
        let result = [];
        let done = this.async();
        if (data.async) {
            for (let i in contexts) {
                (async() => {
                    let httpUtils = new HttpUtils(defaultValue(contexts[i]));
                    let ret = await httpUtils.getSync();
                    result.push(ret);
                    resultLog(result, contexts, done);

                })();
            }
        } else {

            (async() => {
                for (let i in contexts) {
                    let httpUtils = new HttpUtils(defaultValue(contexts[i]));
                    let ret = await httpUtils.getSync();
                    result.push(ret);
                    resultLog(result, contexts);
                }
                done(true);
            })();
        }

    });

};