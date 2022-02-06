const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const album = require('../entities/Album');

const artist = require('../entities/Artist');

const albumCastDetails = sequelize.define('albumCastDetails',{
    // albumID:{
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: album,
    //         key: 'id'
    //       }
    // },
    // artistID:{
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: artist,
    //         key: 'id'
    //     }
    // },
},{timestamps: false});

albumCastDetails.removeAttribute('id');

module.exports = albumCastDetails;