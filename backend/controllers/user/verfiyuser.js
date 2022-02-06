const User = require('../../models/user/User');

module.exports = async function({id, verificationlink},req){
    const user = await User.findOne({where: {id: id}});
    if(!user){
      const err = new Error("Invalid verificaton link!");
      err.code=201;
      throw err;
    }
    if(user.dataValues.verficationcode!=verificationlink||user.dataValues.verficationcode=='expired'){
      const err = new Error("verification link is expired!");
      err.code=201;
      throw err;
    }
    const result = await User.update({verficationcode: 'expired',status: 'verified'},
    {where:{id: id},fields: ['verficationcode','status'],validate: true});
    console.log(result);
    return {
      status: true
    }
  }