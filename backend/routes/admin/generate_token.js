const jwt = require("jsonwebtoken");
const RefreshToken = require("../../models/Admin/Tokens");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const { token } = req.body;
  console.log("token: " + token);
  console.log("authHeader:" + authHeader);
  if (!authHeader || token === undefined)
    return res.status(403).send("Not Authroised");
  const decoded = jwt.decode(authHeader);
  const tokenData = await RefreshToken.findOne({
    where: {
      id: decoded.token_id,
    },
  });
  if (tokenData === null) return res.status(403).send("Not Authroised");
  const isOk = bcrypt.compareSync(token, tokenData.token);
  if (!isOk) {
    return res.status(403).send("Invalid Token");
  }
  let expires = new Date(tokenData.createdAt);
  expires.setMonth(expires.getMonth() + 1);
  if (!(Date.now() <= expires)) {
    return res.status(403).send("token expired!");
  }
  const access_token = await jwt.sign(
    {
      token_id: tokenData.id,
      userId: tokenData.adminId,
    },
    "easyplaintextthatisben10",
    { expiresIn: "60s" }
  );
  return res.json({ new_access_token: access_token });
};
