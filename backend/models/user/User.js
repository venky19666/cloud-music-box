const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const bcrypt = require('bcryptjs');
const User = sequelize.define('user',{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    secondname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneno: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dob:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profilepic:{
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verficationcode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    verficationTime: {
        type: Sequelize.DATE,
        allowNull: true,
    }
},{
    timestamps: false
});

module.exports = User;