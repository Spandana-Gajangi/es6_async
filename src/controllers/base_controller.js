let HttpCodes =  require('./../utils/http_codes');
let JWTSign  =  require('jsonwebtoken/sign');

class BaseController {
    sendResponse(res, statusCode, message, data) {
        if (statusCode >= 200 && statusCode < 300) {
            return res.status(statusCode).send({
                statusCode: statusCode,
                message: message,
                status: 'success',
                data: data
            });
        } else {
            return res.status(statusCode).send({
                statusCode: statusCode,
                message: message,
                status: 'failure',
                errors: data
            });
        }
    }
    generateToken(user){
        return JWTSign({ email: user.email, _id: user._id }, 'Spandana G', {
            expiresIn: 10080, // in seconds,
            issuer: 'localhost1',  // wasn't sure what this was, so I left as defaulted in the doc
            audience: 'localhost'
        });
    };

    setUserInfo (request) {
        return {
            fullName: request.fullName,
            email: request.email,
            token: request.resetPasswordToken
        };
    };

}
const base_controller = new BaseController();
module.exports = base_controller;