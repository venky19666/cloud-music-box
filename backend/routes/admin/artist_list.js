
const Op = require('sequelize').Op;
const Artist = require('../../models/entities/Artist');

module.exports = async (req,res,next) => {
  const {name} = req.body;
  if(name===""||name===undefined||name===null)
    return res.json({status_code: 403, message: "Invalid Input!"});
  try{
    const artist = await Artist.findAll({
      where: {
        name: {
          [Op.like]: name + "%",
          [Op.like]: "%" + name,
          [Op.like]: "%" + name + "%",
        },
      },
      limit: 10,
    });
    console.log(artist)
    return res.json(artist);
  }
  catch(error){
    console.log(error);
    return res.json({status_code: 403,message: "Internal Server Error!"});
  }
}