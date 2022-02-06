const Song = require("../../models/entities/Song");
const ALbum = require("../../models/entities/Album");
const Artist = require("../../models/entities/Artist");
const { client } = require("../../util/config");

module.exports = async function ({ id }, req) {
  try {
    const song = await Song.findOne({
      where: { id: id },
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
          model: ALbum,
          attributes: ["name", "imageURL"],
        },
      ],
    });
    // data = song.dataValues;
    song.imageURL = song.album.imageURL;
    song.albumName = song.album.name
    // data.url = client.albumURL+song.album.name+'/'+song.songURL;
    // data.singers = [];
    // data.lyricitis = [];
    // song.singers.forEach(item=>{
    //     item.imageURL = client.artistURL+item.imageURL;
    //     data.singers.push(item.dataValues);
    // })
    // song.lyricitis.forEach(item=>{
    //     item.imageURL = client.artistURL+item.imageURL;
    //     data.lyricitis.push(item.dataValues);
    // })
    return song;
  } catch (error) {
    return error;
  }
};