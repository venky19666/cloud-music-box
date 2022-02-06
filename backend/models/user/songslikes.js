const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Song = require('../entities/Song');

const User = require('./User');

const songlikes = sequelize.define('songlikes',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    // userId: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    // albumId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: Sequelize.DATE
    }
},{timestamps: false});

module.exports = songlikes;