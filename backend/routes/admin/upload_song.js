const ParmsValidator = require("../../util/request_parms_validater");
const Song = require('../../models/entities/Song');
const sequelize = require("../../util/database");
const Album = require("../../models/entities/Album");
const MoodRelation = require("../../models/relations/MoodRelation");
const Singers = require("../../models/relations/Singer");
const Lyricists = require("../../models/relations/Lyricists");

module.exports = async (req,res,next) => {
  if (
    ParmsValidator(["albumId", "songName", "singers", "lyricits"], req.body)
  ) {
    return res.json({ message: "Invalid Input", status_code: 406 });
  }
  if (req.file === undefined) {
    return res.json({ message: "Invalid Input", status_code: 406 });
  }
  try{
    await sequelize.transaction(async (transaction)=>{
      try{
        if(await Album.findOne({where: {id: req.body.albumId}})===null){
          return res.json({ message: "Invalid Input", status_code: 406 });
        }
        const song = await Song.create({
            name: req.body.songName,
            songURL: req.file.filename,
            albumId: req.body.albumId,
        },{ transaction }
          );
        const singers = req.body.singers.split(",");
        for(const id in singers){
          await Singers.create({
            songId: song.id,
            artistId: singers[id],
          },{ transaction })
        }
        const lyricits = req.body.lyricits.split(',');
        for (const id in lyricits) {
          await Lyricists.create({
            songId: song.id,
            artistId: lyricits[id],
          }, { transaction })
        }
        if (req.body.moodData!==undefined && req.body.moodData!==null){
          const moodIds = req.body.moodData.split(',');
          for (const id in moodIds) {
            await MoodRelation.create({
              songId: song.id,
              moodId: moodIds[id],
            }, { transaction })
          }
        }
        await transaction.commit();
        return res.json({message: "Success", status_code: 200});
      }catch(error){
        console.log(error);
        await transaction.rollback();
        return res.json({ status_code: 403, message: "Internal server error" });
      }
    })
  }catch(error){
    console.log(error);
    return res.json({ status_code: 403, message: "Internal server error" });
  }
}