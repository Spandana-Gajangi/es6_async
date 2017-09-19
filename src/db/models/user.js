let  Sequelize =  require('sequelize');

const UserSchema = {
    fullName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    resetPasswordToken: { type: Sequelize.STRING }
};
module.exports = UserSchema;