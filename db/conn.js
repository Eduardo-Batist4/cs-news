const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

try {
    sequelize.authenticate();
    console.log('Conectamos com sucesso!');
} catch (error) {
    console.log('Não conseguimos conectar', error);
}

module.exports = sequelize;