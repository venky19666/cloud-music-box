const Sequelize = require('sequelize');
const Artist = require('../../models/entities/Artist');
const ArtistLikes = require('../../models/user/artistlikes');
const User = require('../../models/user/User');

// function getArtistImageURL(filename) {
//   return filename == 'default' ? process.env.clientURL + '/artist-data/default.png' : process.env.clientURL + '/artist-data/' + filename;
// }

module.exports = async function ({ index, num, filter, id }, req) {

  let whereObject = {};
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
  }

  if (index != undefined) {

    let findObj = {
      where: whereObject,
      offset: index || 0, limit: num || 8,
      include: [],
    }

    if (req.isAuth) {
      findObj.include.push({
        model: User,
        as: 'artistlikesdata',
        through: {
          model: ArtistLikes,
          where: {
            userId: req.userID
          }
        },
        required: filter == undefined ? false : filter.user == undefined ? false : filter.user,
      });
    }

    let artist = await Artist.findAll(findObj);
    // artist.forEach(item => {
    //   item.imageURL = getArtistImageURL(item.imageURL);
    // })

    return artist;
  }
}