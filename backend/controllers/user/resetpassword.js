const bcrypt = require('bcryptjs');

module.exports = async function({id,verificationlink,password},req){
    const user = await User.findOne({where: {id: id}});
    if(!user){
      const err = new Error("Invalid reset link!");
      err.code=500;
      throw err;
    }
    if(user.dataValues.verficationcode!=verificationlink||user.dataValues.verficationcode=='expired'){
      const err = new Error("reset link is expired!");
      err.code=500;
      throw err;
    }
    const hashed = bcrypt.hashSync(password, 12);
    const result = await User.update({verficationcode: 'expired',password: hashed},
    {where:{id: id},fields: ['verficationcode','password'],validate: true});
    if(!result)
        return {
        status: "true"
        }
}