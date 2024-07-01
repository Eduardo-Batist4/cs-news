const { DataTypes } = require('sequelize');
const database = require('../db/conn');

const User = database.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    team: {
        type: DataTypes.STRING,
        require: true
    },
});

module.exports = User;