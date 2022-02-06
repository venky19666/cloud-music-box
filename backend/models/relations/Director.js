const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const artist = require('../entities/Artist');

const album = require('../entities/Album');

const albumComposerData = sequelize.define('albumcomposerdata',{
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
    //       }
    // }
},{timestamps: false});

albumComposerData.removeAttribute('id');

module.exports = albumComposerData;