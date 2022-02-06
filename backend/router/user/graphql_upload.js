const express = require('express');
const randomString = require('randomstring');
const multer = require('multer');

const path = require('path');

const _root = require('../../util/nav-helper');

const router = express.Router();

const storage= multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(_root,'storage','userdata','profile-pictures',))
    },
    filename: (req,file,cb)=>{
        cb(null,randomString.generate({length:50,charset: 'alphanumeric'})+'.'+file.mimetype.split('/')[1]);
    }
})

const fileFilter= (req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

router.post('/profile-image-upload',multer({storage: storage, fileFilter: fileFilter}).single('profile'),(req,res,next)=>{
    console.log(req.file);
    res.json({filename: req.file.filename});
})

module.exports = router;