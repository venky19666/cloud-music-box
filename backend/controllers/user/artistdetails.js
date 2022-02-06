const Sequelize = require('sequelize');
const Album = require('../../models/entities/Album');
const User = require('../../models/user/User');
const Artist = require('../../models/entities/Artist');
const Song = require('../../models/entities/Song');
const ArtistLikes = require('../../models/user/artistlikes');

function getArtistImageURL(filename) {
  return filename == 'default' ? process.env.clientURL + '/artist-data/default.png' : process.env.clientURL + '/artist-data/' + filename;
}

function getAlbumImageURL(filename, albumname) {
  return filename == 'default' ? process.env.clientURL + '/artist-data/default.png' : process.env.clientURL + '/data/' + albumname + '/' + filename;
}

module.exports = async function ({ id }, req) {
  let findObject = {
    where: { id: id },
    include: [
      {
        model: Album,
        as: 'composer',
        include: [
          {
            model: Artist,
            as: 'composer'
          },
          {
            model: Artist,
            as: 'cast'
          }],
      },
      {
        model: Album,
        as: 'cast',
        include: [
          {
            model: Artist,
            as: 'composer'
          },
          {
            model: Artist,
            as: 'cast'
          }]
      },
      {
        model: Song,
        as: 'singers',
        include: [
          {
            model: Artist,
            as: 'singers'
          },
          {
            model: Artist,
            as: 'lyricitis'
          }, {
            model: Album
          }]
      },
      {
        model: Song,
        as: 'lyricitis',
        include: [
          {
            model: Artist,
            as: 'singers'
          },
          {
            model: Artist,
            as: 'lyricitis'
          }, {
            model: Album
          }]
      }],
  }
  if (req.isAuth) {
    findObject.include.push({
      model: User,
      as: 'artistlikesdata',
      through: {
        model: ArtistLikes,
        where: {
          userId: req.userID
        }
      },
      required: false,
    });
  }
  const artist = await Artist.findOne(findObject);
  artist.isLike = artist.user != undefined ? artist.User.length > 0 : false;

  // artist.imageURL = getArtistImageURL(artist.imageURL);
  // artist.cast.forEach(item => {
  //   item.imageUrl = getAlbumImageURL(item.imageUrl, item.name);
  //   item.cast.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   })
  //   item.composer.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   })
  // });
  // artist.composer.forEach(item => {
  //   item.imageUrl = getAlbumImageURL(item.imageUrl, item.name);
  //   item.cast.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   })
  //   item.composer.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   })
  // });
  // artist.singers.forEach(item => {
  //   item.imageURL = item.album.imageUrl;
  //   item.albumName = item.album.name;
  //   item.singers.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   });
  //   item.lyricitis.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   })
  // })
  // artist.lyricitis.forEach(item => {
  //   item.imageURL = item.album.imageUrl;
  //   item.albumName = item.album.name;
  //   item.singers.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   });
  //   item.lyricitis.forEach(i => {
  //     i.imageURL = getArtistImageURL(i.imageURL);
  //   })
  // });
  return artist;
}