let appConfig =  require('./../app_config');
class Util {
     constructor(config){}
     Log (...params){
        if (appConfig.nodeEnv !== 'production') {
            console.log(params);
        }
    };
}
const util = new Util();
module.exports = util;