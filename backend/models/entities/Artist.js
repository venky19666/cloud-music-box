const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Artist = sequelize.define('artist',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageURL:{
        type: Sequelize.TEXT,
        allowNull: true,
        get(){
            let value = this.getDataValue("imageURL");
            if(value===null)
                return null;
            return process.env.SERVER_DOMAIN+process.env.ARTIST_PROFILE_PICTURE_PATH + value;
        }
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
},{timestamps: false});

module.exports = Artist;