const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const artist = require('./Artist');

const artistType = require('./ArtistType');

const artistRelation = sequelize.define('artistRelation',{
    artistID:{
        type: Sequelize.INTEGER,
        references: {
            model: artist,
            key: 'id'
          }
    },
    artistTypeID:{
        type: Sequelize.INTEGER,
        references: {
            model: artistType,
            key: 'id'
          }
    }
},{timestamps: false});

artistRelation.removeAttribute('id');

module.exports = artistRelation;