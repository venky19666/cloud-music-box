const convertToJson = require('../../util/convertIntoJson');
const Op = require('sequelize').Op;

const Album = require('../../models/entities/Album');
const Moods = require('../../models/entities/Moods');
const Songs  = require('../../models/entities/Song');

const Cast  = require('../../models/relations/Cast');
const Composer = require('../../models/relations/Director');
const MoodData = require('../../models/relations/MoodRelation');
const Lyricists = require('../../models/relations/Lyricists');
const Singers  = require('../../models/relations/Singer');
exports.get = async (req,res,next)=>{
    res.render('admin/uploadAlbum',{
        stylesheets: [],
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: []
    });
};

exports.post = async (req,res,next)=>{
    try{
        // console.log(req.body,req.files);
        const DataSource = convertToJson.convertToJsonAlbum(req.body,req.files);
        // console.log(DataSource);
        console.log(DataSource.songData[0].moodNames)
        const album = await Album.create({
            name: DataSource.albumName,
            rating: 3.5,
            imageUrl: DataSource.imageURL,
            likes: 0,
            releaseDate: DataSource.releaseDate,
        });
        for(const artist of DataSource.musicDirector){
            await Composer.create({
                albumId: album.dataValues.id,
                artistId: artist
            });
        }
        for(const artist of DataSource.castDetails){
            await Cast.create({
                albumId: album.dataValues.id,
                artistId: artist
            });
        }
        for(const song of DataSource.songData){
            const songR = await Songs.create({
                name: song.songName,
                songURL: song.songURL,
                likes: 0,
                albumId: album.dataValues.id,
            });
            for(const artist of song.singers){
                await Singers.create({
                    songId: songR.dataValues.id,
                    artistId: artist
                });
            }
            for(const artist of song.lyricists){
                await Lyricists.create({
                    songId: songR.dataValues.id,
                    artistId: artist
                });
            } 
            console.log(song.moodNames);
            const mooddata = await Moods.findAll({
                where: {
                            name: {
                                    [Op.in]: song.moodNames,
                                }
                        }
            });
            console.log(mooddata);
            for(let moods of mooddata){
                await MoodData.create({
                    songId: songR.dataValues.id,
                    moodTypeId: moods.dataValues.id,
                })
            }
        }
        return res.render('admin/uploadAlbum',{
            stylesheets: [],
            isAdmin: req.session.IsLoggedIn,
            error: [],
            success: ["Uploaded Successfull!"]
        });
    }catch(error){
        console.log(error);
        res.send("error occred");
    }
};