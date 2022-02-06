const MoodData = require("../../models/entities/Moods")

module.exports = async (req,res,next) => {
  try{
    const moods = await MoodData.findAll();
    return res.json(moods);
  }
  catch(error){
    return res.json({message: "Interal Server Error!", status_code: 500});
  }
}