module.exports = (req,res,next)=>{
    if(req.session.IsLoggedIn===true){
        next();
    }
    else{
        res.redirect('/login');
    }
};