
const bcrypt = require('bcryptjs');
const User = require('../../models/user/User');
const jwt = require('jsonwebtoken');

module.exports = async function({username,password},req){
    const user = await User.findOne({where: {email: username}});
    if(!user){
      const err = new Error("you entered email is not yet registered!");
      err.code= 501;
      throw err;
    }
    if(user.dataValues.status!="verified"){
      const err = new Error("your account is not verified! check you email to activation link");
      err.code= 500;
      throw err;
    }
    if(!bcrypt.compareSync(password,user.dataValues.password)){
      const err = new Error("password is incorrect!");
      err.code= 500;
      throw err;
    }
    const token = jwt.sign({userID: user.dataValues.id,email: user.dataValues.email},'easyplaintextthatisben10',{
      expiresIn: '1h'
    })
    console.log(user);
    return{
      token: token,
      userID: user.dataValues.id,
      firstname: user.dataValues.firstname,
      secondname: user.dataValues.secondname,
      userImage: user.dataValues.profilepic,  
    }
  }