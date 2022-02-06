const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const artistType = sequelize.define('artistType',{
    
    artistType:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps: false});

module.exports = artistType;