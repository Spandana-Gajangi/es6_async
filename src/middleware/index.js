let v1 =  require('uuid');
let request =  require('request');
let Util =  require('./../utils/index');
let  base_controller  =  require('./../controllers/base_controller');
let AppConfig =  require('./../app_config');
let HttpCodes =  require('./../utils/http_codes');
let  message  =  require('./../utils/status_messages');
let  user_services  =  require('./../services/user_services');

class Middleware{
    // Future purpose
    async requireAuth (req, res, next) {
        let user = await user_services.findOne({ fullname: req.params.name, resetPasswordToken: req.get('authorization') });
        if (user) {
            next();
        } else {
            return base_controller.sendResponse(res, HttpCodes.Unauthorized, message.Unauthorized);
        }
    };
    errorHandler (err, req, res, next) {
        let uniqueId = v1();
        let result = {
            code: HttpCodes.InternalServerError,
            uniqueId: uniqueId,
            status: 'failure',
            message: 'Internal Server Error. Ref #' + uniqueId,
            err: err
        };
        Util.Log(err);
        return res.send(result);
    };
    methodNotAllowed  (req, res, next){
        return base_controller.sendResponse(res, HttpCodes.MethodNotAllowed, message.NotAllowed);
    };
    isPostBodyValid (req, res, next) {
        if (Object.keys(req.body).length === 0) {
            return base_controller.sendResponse(res, HttpCodes.PreconditionFailed, message.CannotEmpty);
        } else {
            next();
        }
    };
    pageNotFound (req, res, next){
        return base_controller.sendResponse(res, HttpCodes.NotFound, message.NotFound);
    };
}
const middleware = new Middleware();
module.exports =  middleware;
