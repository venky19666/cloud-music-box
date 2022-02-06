const multer = require('multer');
const rootDir = require('../nav-helper');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        if(!fs.existsSync(path.join(rootDir,'storage','data',req.body.albumName))){
            fs.mkdirSync(path.join(rootDir,'storage','data',req.body.albumName));
        }
        cb(null,path.join(rootDir,'storage','data',req.body.albumName));
    },
    filename: function(req,file,cb){
        cb(null,uuid.v4()+'.'+file.mimetype.split('/')[1]);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
// ||file.mimetype==='audio/mp3'||file.mimetype==='audio/mpeg'
module.exports = multer({ storage: storage, fileFilter: fileFilter }).single("albumArtImage");