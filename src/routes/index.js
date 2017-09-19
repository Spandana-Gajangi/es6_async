let express = require('express')
let repository =  require('./../db/index');
let user_controller =  require('./../controllers/user_controller');
let middleware =  require('./../middleware/index');

class Route {
    constructor(router,middleware) {
        this.router = express.Router();
    }
    ConfigureRoutes() {
        this.router
            .route('/user/register')
            .post([
                middleware.isPostBodyValid,
                user_controller.register
            ])
            .all(middleware.methodNotAllowed);

        this.router
            .route('/user/log')
            .post([
                user_controller.loginUser
            ]).all(middleware.methodNotAllowed);

        this.router
            .route('/user/profile/:name')
            .get([
                user_controller.getUserProfile
            ])
            .put([
                middleware.requireAuth,
                user_controller.getUserProfile
            ]).all(middleware.methodNotAllowed);

        return this.router;
    }
}

module.exports = Route;
