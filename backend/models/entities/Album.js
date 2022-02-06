const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Album = sequelize.define('albums', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: true,
    get() {
      let value = this.getDataValue("imageURL");
      let albumName = "/data/"+this.getDataValue("name")+"/";
      if (value === null)
        return null;
      return process.env.SERVER_DOMAIN + albumName + value;
    }
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  releaseDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
},{timestamps: false});

module.exports = Album;
