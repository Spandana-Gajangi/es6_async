"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppConfig = function AppConfig(host, port, nodeEnv) {
    _classCallCheck(this, AppConfig);

    this.host = process.env.HOST;
    this.port = process.env.PORT;
    this.nodeEnv = process.env.NODE_ENV;
};

var appConfig = new AppConfig();
module.exports = appConfig;