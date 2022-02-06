const Album = require('../../models/entities/Album');
const Song = require('../../models/entities/Song');
const Artist = require('../../models/entities/Artist');
const Moods = require('../../models/entities/Moods');
const Cast = require('../../models/relations/Cast');
const Director = require('../../models/relations/Director');
const Lyricists = require('../../models/relations/Lyricists');
const MoodRelation = require('../../models/relations/MoodRelation');
const Singers = require('../../models/relations/Singer');
const convertToJson = require('../../util/convertIntoJson');
const Op = require('sequelize').Op;

exports.getAlbumID = (req, res, next) => {
    res.render('admin/updateAlbumId', {
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: [],
    })
}


exports.postAlbumUpdate = async (req, res, next) => {
    const albumID = req.body.albumId;
    const data = {
        albumId: albumID,
        albumName: null,
        musicDirector: [],
        castDetails: [],
        releaseDate: [],
        songData: [],
    };
    await Album.findOne({
        where: {
            id: albumID,
        },
        raw: true,
    })
        .then(result => {
            data.albumName = result.name;
            data.releaseDate = result.releaseDate;
            return result
        })
        .catch(err => console.log(err));
    const directorIds = await Director.findAll({
        attributes: ['ArtistID'],
        where: {
            albumId: albumID,
        },
        raw: true
    })
        .then(result => result).catch(err => console.log(err));
    console.log(Object.values(directorIds))
    await Artist.findAll({
        attributes: ['id', 'name'],
        where: {
            id: {
                [Op.in]: [] = directorIds.map(list => list.ArtistID)
            }
        },
        raw: true
    }).then(result => {
        data.musicDirector = result;
    }).catch(err => console.log(err));
    const castIds = await Cast.findAll({
        attributes: ['ArtistID'],
        where: {
            albumId: albumID,
        },
        raw: true
    }).then(result => result).catch(err => console.log(err));
    await Artist.findAll({
        attributes: ['id', 'name'],
        where: {
            id: {
                [Op.in]: [] = castIds.map(list => list.ArtistID)
            }
        },
        raw: true
    }).then(result => {
        data.castDetails = result;
    }).catch(err => console.log(err));

    const songsData = await Song.findAll({
        where: {
            albumID: albumID,
        },
        raw: true,
    }).then(result => result).catch(err => console.log(err));
    console.log(songsData)
    for(let i =0; i< songsData.length; i++){
        const songData = async (item)=>{
            const song = {
                id: item.id,
                songName: item.name,
                singers: [],
                lyricists: [],
                moodNames: [],
            }
            const singersIds = await Singers.findAll({
                attributes: ['artistID'],
                where: {
                    songID: item.id,
                },
                raw: true
            })
                .then(result => result)
                .catch(err => console.log(err));
            await Artist.findAll({
                attributes: ['id', 'name'],
                where: {
                    id: {
                        [Op.in]: [] = singersIds.map(list => list.artistID)
                    }
                },
                raw: true
            }).then(result => {
                song.singers = result;
            }).catch(err => console.log(err));
            const lyricistsIds = await Lyricists.findAll({
                attributes: ['artistID'],
                where: {
                    songID: item.id,
                },
                raw: true
            })
                .then(result => result)
                .catch(err => console.log(err));
            await Artist.findAll({
                attributes: ['id', 'name'],
                where: {
                    id: {
                        [Op.in]: [] = lyricistsIds.map(list => list.artistID)
                    }
                },
                raw: true
            }).then(result => {
                song.lyricists = result;
            }).catch(err => console.log(err));
            const moodIds = await MoodRelation.findAll({
                attributes: ['moodTypeID'],
                where: {
                    songID: item.id,
                },
                raw: true
            })
                .then(result => result)
                .catch(err => console.log(err));
            await Moods.findAll({
                attributes: ['id', 'name'],
                where: {
                    id: {
                        [Op.in]: [] = moodIds.map(list => list.moodTypeID)
                    }
                },
                raw: true
            }).then(result => {
                song.moodNames = result;
            }).catch(err => console.log(err));
            return song;
        }
        let temp =await songData(songsData[i]).then(result=>result).catch(err=>console.log(err))
        data.songData.push(temp);
    }
    console.log(data)
    res.render('admin/updateAlbum',{
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: [],
        data: data,
    })

}

exports.postEditStatus = async (req,res,next)=>{
    const result = convertToJson.convertToJsonAlbum(req.body,req.files);
    Album.update({
        name: result.albumName,
        rating: 3.5,
        imageUrl: result.imageURL,
        likes: 0,
        releaseDate: result.releaseDate,
    },{
        where: {
            id: req.body.id,
        }
    })
    .then(output=>{
        Director.destroy({
            where: {
                albumID: req.body.id,
            }
        }).then().catch(err=>console.log(err));
        result.musicDirector.forEach(item=>{
            Director.create({
                albumID: req.body.id,
                artistID: item,
            }).then().catch(err=>console.log(err));
        });
        Cast.destroy({
            where: {
                albumID: req.body.id,
            }
        }).then().catch(err=>console.log(err));
        result.castDetails.forEach(item=>{
            Cast.create({
                albumID: req.body.id,
                artistID: item,
            }).then().catch(err=>console.log(err));
        });
        result.songData.forEach(song=>{
            Song.update({
                name: song.songName,
                songURL: song.songURL,
                likes: 0,
            },{
                where:{
                    id: song.id,
                }
            }).then().catch(err=>console.log(err));
            Singers.destroy({
                where: {
                    songID: song.id,
                }
            }).then().catch(err=>console.log(err));
            song.singers.forEach(list=>{
                Singers.create({
                    songID: song.id,
                    artistID: list,
                }).then().catch(err=>console.log(err));
            })
            Lyricists.destroy({
                where: {
                    songID: song.id,
                }
            }).then().catch(err=>console.log(err));
            song.lyricists.forEach(list=>{
                Lyricists.create({
                    songID: song.id,
                    artistID: list,
                }).then().catch(err=>console.log(err));
            });
            MoodRelation.destroy({
                where:{
                    songID: song.id,
                }
            }).then().catch(err=>console.log(err));
            Moods.findAll({
                attributes: ['id'],
                where:{
                    name: {
                        [Op.in]: song.moodNames
                    }
                },
                raw: true
            }).then(final=>{
                console.log(final)
                final.forEach(g=>{
                    MoodRelation.create({
                        songID: song.id,
                        moodTypeID: g.id,
                    }).then().catch(err=>console.log(err));
                })
            }).catch(err=>console.log(err));
            
        })
    })
    .catch(err=>console.log(err));
    res.render('admin/status',{
        message: "Updated Successfull",
        link: '/admin/update/Album/id',
        linkText: 'click here to one more update',
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: []
    })
}
