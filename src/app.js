//import * as bodyParser from  'body-parser';
let bodyParser = require('body-parser')
let express = require('express');
let compression = require('compression');
let cors = require('cors');
let middleware =  require('./middleware/index');
let Route =  require('./routes/index');
let appConfig =  require('./app_config');
let util =  require('./utils/index');
let repository =  require('./db/index');

class Server {
    static bootstrap() {
        return new Server();
    }
    constructor(app, ) {
        this.app = express();
        this.configureApp();
    }
    configureApp() {
        this.app.use(cors(
            {
                allowedHeaders: ['Content-Type', 'authorization', 'Access-Control-Allow-Headers', 'isAdmin'],
                origin: '*',
                methods: 'OPTIONS,PUT,POST,DELETE,GET',
                credentials: true
            }
        ));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(express.static('artifacts'));
        this.app.disable('x-powered-by');
        this.app.use(new Route().ConfigureRoutes(this._middleware));
        this.app.all('*', middleware.pageNotFound);
        this.app.use(middleware.errorHandler);
        repository.sync()
           .then(() => {
                let server = this.app.listen(appConfig.port,
                    appConfig.host, () => {
                        util.Log('------------------------------------------New Worker Launched------');
                        util.Log(
                            `App (With PID : ${process.pid}) is ready on http://${server.address().address}:${server.address().port}`
                        );
                    });
        });
    }
}
Server.bootstrap().app;
