const Artist = require('../../models/entities/Artist');

exports.get = (req,res,next)=>{
    res.render('admin/uploadArtist',{
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: []
    })
}

exports.post =async (req,res,next)=>{
    try{
        await Artist.create({
            name: req.body.artistName,
            imageURL: req.file.filename || "default"
        });
        res.render('admin/uploadArtist',{
            isAdmin: req.session.IsLoggedIn,
            error: [],
            success: ['Uploaded successfull..']
        })
    }catch(error){

    }
    
}