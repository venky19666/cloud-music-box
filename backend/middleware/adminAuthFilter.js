
module.exports = (req,res,next) => {
  if(req.adminAuth)
    return next();
  else 
    return res.sendStatus(401);
}