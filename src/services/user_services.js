let repository =  require('./../db/index');
class UserServices {
    findOne (req) {
        return repository.findOne(repository.collections.User, req);
    };
    createUser (req) {
        return repository.create(repository.collections.User, req);
    };
    UpdateUser (req)  {
        return repository.update(repository.collections.User, req.condition, req.attributes);
    };
}
const user_services = new UserServices();
module.exports = user_services;
