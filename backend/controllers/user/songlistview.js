const Sequelize = require('sequelize');
const Album = require('../../models/entities/Album');
const Songs = require('../../models/entities/Song');
const Singer = require('../../models/relations/Singer');
const User = require('../../models/user/User');
const songlikes = require('../../models/user/songslikes');
const Artist = require('../../models/entities/Artist');

module.exports = async function ({ index, num, filter }, req) {

  try {
    let whereObject = {};
    let orderObject = [['likes', 'DESC']];
    if (filter != undefined && filter.name != undefined) {
      whereObject = {
        name: {
          [Sequelize.Op.like]: "%" + filter.name
        },
        name: {
          [Sequelize.Op.like]: filter.name + "%"
        },
        name: {
          [Sequelize.Op.like]: "%" + filter.name + "%"
        },
      }
    };
    let findObject = {
      where: whereObject,
      offset: index || 0, limit: num || 8,
      include: [
        {
          model: Artist,
          as: 'singers'
        },
        {
          model: Artist,
          as: 'lyricitis'
        },
        {
          model: Album,
          attributes: ["name", "imageURL"],
        },
      ],
      order: orderObject,
    };
    if (req.isAuth) {
      findObject.include.push({
        model: User,
        as: "songlikesdata",
        required: filter == undefined ? false : filter.user == undefined ? false : filter.user,
        through: {
          model: songlikes,
          where: {
            userId: req.userID,
          }
        }
      })
    }
    const song = await Songs.findAll(findObject);
    // console.log(song)
    song.forEach((songObj, index) => {
      // song[index].url = songObj.songURL; for url display
      song[index].isLike = req.isAuth ? songObj.songlikesdata.length > 0 : false;
      song[index].albumName = songObj.album.name;
      song[index].imageURL = songObj.album.imageURL;
    });
    return song;
  }
  catch (err) {
    throw err;
  }
}