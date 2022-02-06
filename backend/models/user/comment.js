const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const user = require('./User');

const album = require('../entities/Album');

const commentbox = sequelize.define('comment',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId:{
        type: Sequelize.UUID,
        references: {
            model: user,
            key: 'id'
          }
    },
    albumId:{
        type: Sequelize.UUID,
        references: {
            model: album,
            key: 'id'
          }
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{timestamps: false});


module.exports = commentbox;