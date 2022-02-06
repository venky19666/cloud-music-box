const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const artist = require('../entities/Artist');

const songs = require('../entities/Song');

const songSingersData = sequelize.define('songsSingersData',{
    // songID:{
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: songs,
    //         key: 'id'
    //       }
    // },
    // artistID:{
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: artist,
    //         key: 'id'
    //       }
    // }
},{timestamps: false});

songSingersData.removeAttribute('id');

module.exports = songSingersData;