 class AppConfig {
    constructor(host,port,nodeEnv) {
        this.host = process.env.HOST;
        this.port = process.env.PORT;
        this.nodeEnv = process.env.NODE_ENV;
    }
}
const appConfig =new AppConfig();
module.exports = appConfig;
