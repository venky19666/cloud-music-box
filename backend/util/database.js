const Sequelize = require('sequelize');
const host = require('./config');
const databse = process.env.type === 'PROD' ? host.PROD.database_name : host.DEV.database_name;
const username = process.env.type === 'PROD' ? host.PROD.username : host.DEV.username;
const password = process.env.type === 'PROD' ? host.PROD.password : host.DEV.password;
const hostname = process.env.type === 'PROD' ? host.PROD.host : host.DEV.host;

const sequlize = new Sequelize(databse, username, password, {
    dialect: 'mysql',
    host: hostname,
    pool: {
        max: 15,
        min: 0,
        idle: 20000,
        acquire: 20000
    },
})

module.exports = sequlize;