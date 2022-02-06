const Op = require('sequelize').Op;
const jsonConverter = require('../../util/convertIntoJson');
const song = require('../../models/entities/Song');
const moods = require('../../models/entities/Moods');
const singer = require('../../models/relations/Singer');
const lyricists = require('../../models/relations/Lyricists');
const moodData = require('../../models/relations/MoodRelation');

exports.get = (req,res,next)=>{
    res.render('admin/uploadSongs',{
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: []
    });
};
function sendStatus(message){
    success.push(message)
}
exports.post =(req,res,next)=>{
    const filterData = jsonConverter.convertToJsonSongs(req.body,[...req.files]);
    filterData.songData.forEach(item=>{
        song.create({
            name: item.songName,
            songURL: item.songURL,
            likes: 0,
            albumID: filterData.albumID
        })
        .then((result)=>{
            item.singers.forEach(id=>{
                singer.create({
                    songID: result.dataValues.id,
                    artistID: id,
                })
                .then()
                .catch(err=>console.log(err));
            });
            item.lyricists.forEach(id=>{
                lyricists.create({
                    songID: result.dataValues.id,
                    artistID: id,
                })
                .then()
                .catch(err=>console.log(err));
            });
            moods.findAll({
                where: {
                    name: {
                        [Op.in]: item.moodNames,
                    }
                }
            }).then(moods=>{
                moods.forEach(mood=>{
                    moodData.create({
                        songID: result.dataValues.id,
                        moodTypeID: mood.id,
                    }).then(()=>{
                        
                    }).catch(err=>console.log(err));
                })
            })
        });
    });
    res.render('admin/uploadSongs',{
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: ['Data uploaded successfull']
    });
};