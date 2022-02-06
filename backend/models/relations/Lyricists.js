const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const artist = require('../entities/Artist');

const songs = require('../entities/Song');

const Lyricists = sequelize.define('Lyricists',{
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

Lyricists.removeAttribute('id');

module.exports = Lyricists;