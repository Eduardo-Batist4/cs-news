const { DataTypes } = require('sequelize');
const database = require('../db/conn');
const User = require('./User');

const Comment = database.define('Comment', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
});

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = Comment; 