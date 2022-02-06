const multer = require('multer');
const rootDir = require('../nav-helper');
const album = require('../../models/entities/Album');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log(req.body.albumId);
        album.findOne({where:{id: req.body.albumId}})
        .then(albumResult=>{
            console.log(albumResult)
            if (albumResult!==null)
                cb(null, path.join(rootDir, 'storage', 'data', albumResult.name));
        });
    },
    filename: function(req,file,cb){
        cb(null,uuid.v4()+'.'+file.mimetype.split('/')[1]);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='audio/mp3'||file.mimetype==='audio/mpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single("audioFile");