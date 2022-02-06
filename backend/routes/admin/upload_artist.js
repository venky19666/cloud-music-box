const Artist = require('../../models/entities/Artist');
const multer = require('multer');

module.exports = async (req,res,next) => {
  const { name } = req.body;
  const image = req.file || 'notdefined';
  if(name==='')
    return res.json({message: "Invalid Input",status_code: 403});
  try{
    await Artist.create({ name, imageURL: image.filename });
    return res.json({message: "success", status_code: 200});
  }catch(error){
    return res.json({ message: "Internal server error", status_code: 403 });
  }
}