const jwt = require('jsonwebtoken');

module.exports = async function(req,res,next){
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'easyplaintextthatisben10');
    } catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userID = decodedToken.userID;
    return next();
}