const Album = require("../../models/entities/Album");
const Sequelize = require("sequelize");
const Artist = require("../../models/entities/Artist");
const songs = require("../../models/entities/Song");
const { client } = require("../../util/config");
const Comment = require('../../models/user/comment');
const User = require('../../models/user/User');
const albumlikes = require("../../models/user/albumlikes");
const songlikes = require("../../models/user/songslikes");

module.exports = async ({ id }, req) => {
  try {
    let findObject = {
      where: {
        id: id,
      },
      include: [
        {
          association: "composer",
        },
        {
          model: Artist,
          as: "cast",
        },
        {
          model: Comment,
          attributes: ['id','text','time'],
          required: false,
          include: [{
            model: User,
            attributes: ['id','firstname','secondname','profilepic'],
            required: false,
          }]
        },
      ],
      order: [
        [Comment,'time','DESC']
      ],
    }
    let songObj = {
      model: songs,
          include: [
            {
              model: Artist,
              as: "singers",
            },
            {
              model: Artist,
              as: "lyricitis",
            },
          ],
    };
    if(req.isAuth){
      findObject.include.push({
        model: User,
        as: 'albumlikesdata',
          through: {
            model: albumlikes,
            where: {
              userId: req.userID
            }
          },
          required: false,
      });
      songObj.include.push({
        model: User,
        as: "songlikesdata",
        through: {
          model: songlikes,
          where: {
            userId: req.userID,
          }
        }
      });
    }
    findObject.include.push(songObj);
    let AlbumObj = {};
    let album = await Album.findOne(findObject);
    // console.log(AlbumObj)
    if (!album) {
      throw new Error("Invalid Album Id!");
    }
    // const Composer = album.dataValues.composer;
    // const Cast = album.dataValues.cast;
    // const Songs = album.dataValues.songs;
    // AlbumObj = album.dataValues;
    // AlbumObj.releaseDate =
    //   album.dataValues.releaseDate.toString().substr(4, 3) +
    //   " " +
    //   album.dataValues.releaseDate.toString().substr(11, 4);
    // AlbumObj.isLike = req.userID!=undefined ? album.dataValues.albumlikesdata.length>0 : false;
    // AlbumObj.composer = [];
    // AlbumObj.cast = [];
    // AlbumObj.songs = [];
    // AlbumObj.imageUrl = client.albumURL + AlbumObj.name + "/" + album.imageUrl;
    // for (let item of Composer) {
    //   if (item.dataValues.imageURL == "default")
    //     item.dataValues.imageURL = client.artistURL + item.dataValues.imageURL + ".png";
    //   else
    //     item.dataValues.imageURL =
    //       client.artistURL + item.dataValues.imageURL;
    //   AlbumObj.composer.push(item.dataValues);
    // }
    // for (let item of Cast) {
    //   if (item.dataValues.imageURL == "default")
    //     item.dataValues.imageURL = client.artistURL + item.dataValues.imageURL + ".png";
    //   else
    //     item.dataValues.imageURL =
    //       client.artistURL + item.dataValues.imageURL
    //   AlbumObj.cast.push(item.dataValues);
    // }
    // AlbumObj.comments = [];
    // if(album.comments!=null){
    //   for(let item of album.comments){
    //     item.user = item.user.dataValues;
    //     AlbumObj.comments.push(item.dataValues);
    //   }
    // }
    // else{
    //   AlbumObj.comments = null;
    // }     
    // Songs.forEach((song) => {
    //   let Song = song.dataValues;
    //   let Singers = song.dataValues.singers;
    //   let Lyricists = song.dataValues.lyricitis;
    //   Song.isLike = req.userID!=undefined ? song.dataValues.songlikesdata.length>0 : false
    //   Song.singers = [];
    //   Song.lyricitis = [];
    //   Singers.forEach((artist) => {
    //     if (artist.dataValues.imageURL == "default")
    //       artist.dataValues.imageURL =
    //         client.artistURL + artist.dataValues.imageURL+'.png';
    //     else
    //       artist.dataValues.imageURL =
    //         client.artistURL + artist.dataValues.imageURL;
    //     Song.singers.push(artist.dataValues);
    //   });
    //   Lyricists.forEach((artist) => {
    //     if (artist.dataValues.imageURL == "default")
    //       artist.dataValues.imageURL =
    //         client.artistURL + artist.dataValues.imageURL+ ".png";
    //     else
    //       artist.dataValues.imageURL =
    //         client.artistURL + artist.dataValues.imageURL;
    //     Song.lyricitis.push(artist.dataValues);
    //   });
    //   AlbumObj.songs.push(Song);
    // });
    // console.log(AlbumObj);
    console.log(album)
    return album;
  } catch (error) {
    console.log(error)
    return error;
  }
};
