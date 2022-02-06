const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const song = require('../entities/Song');

const playlist = require('./playlist');
const playlistdata = sequelize.define('playlist_data',{
    playlistID:{
        type: Sequelize.UUID,
        references: {
            model: playlist,
            key: 'id'
          }
    },
    songID:{
        type: Sequelize.UUID,
        references: {
            model: song,
            key: 'id'
          }
    },
},{timestamps: false});

playlistdata.removeAttribute('id');

module.exports = playlistdata;