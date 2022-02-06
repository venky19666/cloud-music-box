const AlbumLikes = require("../../models/user/albumlikes");
const Album = require('../../models/entities/Album');
const Artist = require('../../models/entities/Artist');
const Song = require('../../models/entities/Song');
const ArtistLikes = require("../../models/user/artistlikes");
const SongLikes = require("../../models/user/songslikes");

module.exports = async function ({ what, id, status }, req) {
    
  try {
    let result;
    if (req.isAuth) {
      let likesCount = null;
      if (status) {
        
        if (what == "album") {
          likesCount = await Album.findOne({where:{id: id},attributes: ['likes'],raw: true});
          likesCount.likes+=1;
          await Album.update({likes: likesCount.likes},{where: {id: id}});
          result = await AlbumLikes.create({
            userId: req.userID,
            albumId: id,
          });
        } else if (what == "artist") {
          likesCount = await Artist.findOne({where:{id: id},attributes: ['likes'],raw: true});
          likesCount.likes+=1;
          await Artist.update({likes: likesCount.likes},{where: {id: id}});
          result = await ArtistLikes.create({
            userId: req.userID,
            artistId: id,
          });
        } else if (what == "song") {
          likesCount = await Song.findOne({where:{id: id},attributes: ['likes'],raw: true});
          likesCount.likes+=1;
          await Song.update({likes: likesCount.likes},{where: {id: id}});
          result = await SongLikes.create({
            userId: req.userID,
            songId: id,
          });
        }
      }else{
        let result;
        if (what == "album") {
          likesCount = await Album.findOne({where:{id: id},attributes: ['likes'],raw: true});
          likesCount.likes-=1;
          await Album.update({likes: likesCount.likes},{where: {id: id}});
          result = await AlbumLikes.destroy({
            where: {
                albumId: id,
                userId: req.userID
            }
          });
        } else if (what == "artist") {
          likesCount = await Artist.findOne({where:{id: id},attributes: ['likes'],raw: true});
          likesCount.likes-=1;
          await Artist.update({likes: likesCount.likes},{where: {id: id}});
          result = await ArtistLikes.destroy({
            where: {
                artistId: id,
                userId: req.userID
            }
          });
        } else if (what == "song") {
          likesCount = await Song.findOne({where:{id: id},attributes: ['likes'],raw: true});
          likesCount.likes-=1;
          await Song.update({likes: likesCount.likes},{where: {id: id}});
          result = await SongLikes.destroy({
            where: {
                songId: id,
                userId: req.userID
            }
          });
        }
      }

      console.log(result);
      return {
          likes: likesCount.likes,
          status: true
      }
    }
    else{
        throw new Error("user must login to like!");
    }
  } catch (error) {
    return error;
  }
};
