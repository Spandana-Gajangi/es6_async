let  config  =  require('../configs/database');
const Sequelize =  require('sequelize');
const UserSchema =  require('./models/user');
const hashSync  =  require('bcrypt').hashSync;

 class Repository {
    constructor(_sequelize,_models) {
        let collections = {
            User: 'User'
        };
        this._sequelize = new Sequelize(config.db_name, config.username,
            config.password, config);
        this._models = {
            User: this._sequelize.define('User', UserSchema, {
                freezeTableName: true,
                paranoid: true
            })
        };
        this._models.User.hook('beforeCreate', (user, options) => {
            user.password = hashSync(user.password, 10);
        });
        let connectDb = await sync();
    }
    sync() {
        return this._models.User.sync();
    }
    _getCollection(collectionName) {
        return this._models[collectionName];
    }
    findOne(collectionName, condition) {
        return this._getCollection(collectionName).findOne({
            where: condition,
        });
    }
    create(collectionName, data) {
        return this._getCollection(collectionName).create(data, {
            isNewRecord: true,
            validate: true,
        });
    }
    update(collectionName, condition, data) {
        return this._getCollection(collectionName).update(data, {
            where: condition,
            validate: true,
            fields: Object.keys(data)
        });
    }
}
const repository = new Repository();
module.exports =  repository;
