const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const user = require('./User');


const playlist = sequelize.define('playlist',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    createdBy:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
          }
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    playlist_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{timestamps: false});


module.exports = playlist;