const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  const authHeader = req.get('Authorization');
  console.log(authHeader);
  if (!authHeader) {
    req.adminAuth = false;
    return next();
  }
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'easyplaintextthatisben10');
  } catch (err) {
    // console.log(err);
    req.adminAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.adminAuth = false;
    return next();
  }
  req.adminAuth = true;
  req.userID = decodedToken.userID;
  return next();
}