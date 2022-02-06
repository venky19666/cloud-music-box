const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const albums = require('./Album');

const Song = sequelize.define('songs',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    songURL: {
        type: Sequelize.TEXT,
        allowNull:false,
        async get(){
            const album = await albums.findOne({ where: {id:this.getDataValue("albumId")}, attributes: ["name"]});
            return process.env.SERVER_DOMAIN + "/data/" + album.name + "/" + this.getDataValue("songURL");
        }
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    playCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
},{timestamps: false});

module.exports = Song