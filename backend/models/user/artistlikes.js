const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Artist = require('../entities/Artist');

const User = require('./User');

const artistlikes = sequelize.define('artistlikes',{
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

module.exports = artistlikes;