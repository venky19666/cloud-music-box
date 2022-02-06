const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Album = require('../entities/Album');

const User = require('./User');

const albumlikes = sequelize.define('albumlikes',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
          }
    },
    albumId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: Album,
            key: 'id'
          }
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},{timestamps: false});

module.exports = albumlikes;