//npm modules
let async = require('asyncawait/async');
//let await = require('asyncawait/await');
let JWTSign =  require('jsonwebtoken').sign;
let  JWTauthenticate =  require('passport').authenticate;
let compareSync =  require('bcrypt').compareSync;

//local methods
let base_controller =  require('./../controllers/base_controller');
let HttpCodes =  require('./../utils/http_codes');
let message  =  require('./../utils/status_messages');
let user_services  =  require('./../services/user_services');

class UserController{
    consttructor(){

    }
     async register(req, res, next) {
        if (!req.body.email) {
            return res.status(422).send({ error: 'You must enter an email address.' });
        }
        if (!req.body.fullName) {
            return res.status(422).send({ error: 'You must enter your full name.' });
        }
        if (!req.body.password) {
            return res.status(422).send({ error: 'You must enter a password.' });
        }
        try {
            // check for duplicate email
            let existingUser = await user_services.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(422).send({ error: 'That email address is already in use.' });
            }
            else {
                // email not found. So create
                let user = {
                    email: req.body.email,
                    password: req.body.password,
                    fullName: req.body.fullName
                };
                let createUser = await user_services.createUser(user);
                let userInfo = {
                    fullName: createUser.fullName,
                    email: createUser.email,
                };
                let token = base_controller.generateToken(userInfo);
                let updateToken = await user_services.UpdateUser({ condition: { email: user.email }, attributes: { resetPasswordToken: token } });
                res.status(200).json({
                    token: token,
                    data: userInfo,
                    status: true
                });
            }
        } catch (error) {
            return base_controller.sendResponse(res, HttpCodes.InternalServerError, error);
        }
    };
     async loginUser (req, res, next) {
        try {
            if (!req.body.email) {
                return res.status(422).send({ error: 'You must enter an email address.' });
            }
            if (!req.body.password) {
                return res.status(422).send({ error: 'You must enter a password.' });
            }
            let user = await user_services.findOne({ email: req.body.email });
            if (!user) {
                return res.status(406).send({ status: false, message: 'Email does not Exist' });
            }
            else {
                let doesMatch = await compareSync(req.body.password, user.password);
                if (doesMatch) {
                    let token = base_controller.generateToken(user);
                    let updateToken = await user_services.UpdateUser({ condition: { email: user.email }, attributes: { resetPasswordToken: token } });
                    return base_controller.sendResponse(res, HttpCodes.OK, message.OK,
                        {
                            token: token,
                            fullname: user.fullName,
                            email: user.email
                        });
                }
                else {
                    return base_controller.sendResponse(res, HttpCodes.Unauthorized, message.Unauthorized);
                }
            }
        } catch (error) {
            return base_controller.sendResponse(res, HttpCodes.InternalServerError, error);
        }
    };
     async getUserProfile (req, res, next) {
        try {
            let user = await user_services.findOne({ fullname: req.params.name, resetPasswordToken: req.get('authorization') });
            if (user) {
                return base_controller.sendResponse(res, HttpCodes.OK, message.OK, {
                    token: user.resetPasswordToken,
                    fullname: user.fullName,
                    email: user.email
                });
            } else {
                return base_controller.sendResponse(res, HttpCodes.Unauthorized, message.Unauthorized);
            }
        } catch (error) {
            return base_controller.sendResponse(res, HttpCodes.InternalServerError, error);
        }
    };
     async updateUserProfile (req, res, next) {
        try {
            let updateUser = await user_services.UpdateUser({ condition: { resetPasswordToken: req.get('authorization') }, attributes: { email: req.body.email, fullName: req.body.userName } });
            let user = await user_services.findOne({ email: req.body.email });
            return base_controller.sendResponse(res, HttpCodes.OK, message.OK, {
                token: user.resetPasswordToken,
                fullname: user.fullName,
                email: user.email
            });
        } catch (error) {
            return base_controller.sendResponse(res, HttpCodes.InternalServerError, error);
        }
    };
}
const user_controller = new UserController();
module.exports = user_controller;
