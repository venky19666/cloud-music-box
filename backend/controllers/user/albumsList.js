const Album = require('../../models/entities/Album');
const Sequelize = require('sequelize');
const Artist = require('../../models/entities/Artist');
const composer = require('../../models/relations/Director');
const cast = require('../../models/relations/Cast');
const { client } = require('../../util/config');
const albumlikes = require('../../models/user/albumlikes');
const User = require('../../models/user/User');

module.exports = async function ({ index, num, filter }, req) {
    try {
        Album.belongsToMany(Artist, { through: composer });
        Artist.belongsToMany(Album, { through: composer });
        let whereObject = {};
        let orderObject = [['releaseDate', 'DESC']];
        if (filter != undefined && filter.likes == true) {
            orderObject.unshift(['likes', 'DESC'])
        }
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
        let findObject = {
            attributes: ["id", "name", "imageURL", "likes", "releaseDate"],
            offset: index || 0, limit: num || 8,
            where: whereObject,
            include: [{
                model: Artist,
                as: "composer",
                raw: true
            }],
            order: orderObject,
        }
        if (req.userID) {
            findObject.include.push({
                model: User,
                as: 'albumlikesdata',
                through: {
                    model: albumlikes,
                    where: {
                        userId: req.userID
                    }
                },
                required: filter == undefined ? false : filter.user == undefined ? false : filter.user,
            })
        }
        const albums = await Album.findAll(findObject);
        // let AlbumsOutput = [];
        // for (const album of albums) {
        //     let buf = {
        //         id: album.dataValues.id,
        //         name: album.dataValues.name,
        //         imageUrl: client.albumURL + album.name + "/" + album.dataValues.imageUrl,
        //         likes: album.dataValues.likes,
        //         isLike: req.userID!=undefined ? album.dataValues.albumlikesdata.length>0 : false,
        //         composer: [],
        //     }
        //     for (const artist of album.artists) {
        //         let buf2 = {
        //             id: artist.dataValues.id,
        //             name: artist.dataValues.name
        //         }
        //         buf.composer.push(buf2);
        //     }
        //     AlbumsOutput.push(buf);
        // }
        // console.log(AlbumsOutput);
        console.log(albums)
        return albums;
    } catch (err) {
        throw err;
    }
}