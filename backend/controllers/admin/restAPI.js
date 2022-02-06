const artist = require('../../models/entities/Artist');
const album = require('../../models/entities/Album')

const Sequelize = require('sequelize');

exports.suggestion = (req, res, next) => {
    let value = req.body.val;
    if (req.body.val !== "") {
        artist.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: value + '%',
                }
            },
            limit: 10,
        }).then(result => {
            if (result.length > 0) {
                res.json({ status: true, result });
            }
            else {
                res.json({ status: false });
                console.log('nothing found')
            }
        }).catch(err => console.log(err))
    }
};
exports.uploadArtist = (req, res, next) => {
    let fileName = req.file==undefined? "default":req.file.filename;
    artist.create({ name: req.body.name, imageURL: fileName })
        .then(() => { res.json({ status: true }) })
        .catch(() => res.json({ status: false }));
};
exports.albumSuggestion = (req,res,next)=>{
    let value = req.body.val;
    if (req.body.val !== "") {
        album.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: value + '%',
                }
            },
            limit: 10,
        }).then(result => {
            if (result.length > 0) {
                res.json({ status: true, result });
            }
            else {
                res.json({ status: false });
            }
        }).catch(err => console.log(err))
    }
};