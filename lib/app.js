'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import * as bodyParser from  'body-parser';
var bodyParser = require('body-parser');
var express = require('express');
var compression = require('compression');
var cors = require('cors');
var middleware = require('./middleware/index');
var Route = require('./routes/index');
var appConfig = require('./app_config');
var util = require('./utils/index');
var repository = require('./db/index');
var connectDb = require('./db/index');

var Server = function () {
    _createClass(Server, null, [{
        key: 'bootstrap',
        value: function bootstrap() {
            return new Server();
        }
    }]);

    function Server(app) {
        _classCallCheck(this, Server);

        this.app = express();
        this.configureApp();
    }

    _createClass(Server, [{
        key: 'configureApp',
        value: function configureApp() {
            this.app.use(cors({
                allowedHeaders: ['Content-Type', 'authorization', 'Access-Control-Allow-Headers', 'isAdmin'],
                origin: '*',
                methods: 'OPTIONS,PUT,POST,DELETE,GET',
                credentials: true
            }));
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(compression());
            this.app.use(express.static('artifacts'));
            this.app.disable('x-powered-by');
            this.app.use(new Route().ConfigureRoutes(this._middleware));
            this.app.all('*', middleware.pageNotFound);
            this.app.use(middleware.errorHandler);
            if (connectDb) {
                var server = this.app.listen(appConfig.port, appConfig.host, function () {
                    util.Log('------------------------------------------New Worker Launched------');
                    util.Log('App (With PID : ' + process.pid + ') is ready on http://' + server.address().address + ':' + server.address().port);
                });
            }
        }
    }]);

    return Server;
}();

Server.bootstrap().app;