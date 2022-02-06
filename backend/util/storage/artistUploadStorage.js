const multer = require('multer');
const rootDir = require('../nav-helper');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(rootDir,'storage','artist-data'));
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

module.exports = multer({storage: storage,fileFilter: fileFilter}).single('imageURL');