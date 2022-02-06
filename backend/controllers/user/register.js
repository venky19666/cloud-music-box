const User = require('../../models/user/User');
const randomString = require('randomstring');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const mail = require('../../util/smtp');
module.exports = async function({register},req){
    let err = [];
    console.log(register);
    if(!validator.matches(register.firstname,'^[a-zA-Z]*$') || !validator.matches(register.secondname,'^[a-zA-Z]*$')){
      err.push('First Name and Second Name contians only letters!')
    }
    if(!validator.isIn(register.gender.toLowerCase(),['male','female','unknown'])){
      err.push("Gender is not other we provided options");
    }
    if(validator.isEmpty(register.dob)){
      err.push("Date of birth is required!");
    }
    if(!validator.isEmail(register.email)){
      err.push("Entered email is not an email!");
    }
    if(!validator.matches(register.phoneNo,`^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$`)){
      err.push("Phone Number contains invalid charcters!")
    }
    if(!validator.matches(register.password,'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')){
      err.push('Password must contain at least one letter, at least one number, at least one charcter supported charcter [!@#$%^&*] and be longer than 8 charaters.');
    }
    if(await User.findOne({ where: {email: register.email}})!=null){
      err.push("Email already exits!");
    }
    if(err.length==0){
      const { dataValues } = await User.create({
        id: randomString.generate({length: 19,charset: 'alphanumeric',capitalization: 'uppercase'}),
        firstname: register.firstname,
        secondname: register.secondname,
        gender: register.gender,
        dob: register.dob,
        profilepic: register.profilePic,
        email: register.email,
        phoneno: register.phoneNo,
        status: 'verified',
        verficationcode: randomString.generate({length: 100,charset: 'alphanumeric',capitalization: 'uppercase'}),
        password: bcrypt.hashSync(register.password,12),
      })
      // console.log(dataValues);
      // const result = await mail.sendMail({
      //   from: '"admin@cloudmusicbox.ga" <morlavenkatesh9@gmail.com>',
      //   to: dataValues.email,
      //   subject: 'account verification link',
      //   html: `<html>
      //             <body>
      //                 <div class="username" style="text-align: left;text-transform: capitalize;">Hello <span style="color: #e55d19 ;">${dataValues.firstname}</span></div>
      //                 This is yours cloudmusic verfication link <a href="http://${req.headers.host}/${dataValues.id}/${dataValues.verficationcode}/verifiy">${req.headers.host}/${dataValues.id}/${dataValues.verficationcode}/verifiy</a>
      //             </body>
      //         </html>`
      // })
      // console.log(result);
      return {
        status: true
      }
    }
    else{
      const error = new Error(err);
      throw error;
    }
  }