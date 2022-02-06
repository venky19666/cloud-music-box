const Admin = require('../../models/Admin/Admin');
const bcrypt = require('bcryptjs');
const Token = require('../../models/Admin/Tokens');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
        const {username,password,device_code} = req.body;
        if(username===undefined&&password===undefined&&device_code===undefined)
            return res.json({status_code: 400, message: "Required more data!"});
        const admin = await Admin.findOne({
            where: {
                email: req.body.username,
            }
        });
        if(admin===null)
            return res.json({status_code: 401, message: "You don't have an account with this mail ID. Use anther one!"})
        if(!bcrypt.compareSync(password,admin.password))
            return res.json({status_code: 401, message: "Invalid Password!"});
        const refresh_token = uuid.v4();
        const token = await Token.create({
            token: refresh_token,
            client_secrect: device_code,
            adminId: admin.id,
        });
        const access_token = await jwt.sign({
            username: username,
            token_id: token.id,
            userId: admin.id,
        },"easyplaintextthatisben10",{expiresIn: "60s"});
        return res.json({
            access_token,
            token: refresh_token,
            status_code: 200,
        });
    }
    catch(error){
        console.log(error)
        return res.json({status_code: 400, message: "Interal Server error!"});
    }
};