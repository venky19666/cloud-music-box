const { Op } = require('sequelize');
const Album = require('../../models/entities/Album');

module.exports = async function (req, res, next) {
  const { name } = req.body;
  if (name === "" || name === undefined || name === null)
    return res.json({ status_code: 403, message: "Invalid Input!" });
  try {
    const albums = await Album.findAll({
      where: {
        name: {
          [Op.like]: name + "%",
          [Op.like]: "%" + name,
          [Op.like]: "%" + name + "%",
        },
      },
      limit: 10,
    });
    console.log(albums)
    return res.json(albums);
  }
  catch (error) {
    console.log(error);
    return res.json({ status_code: 403, message: "Internal Server Error!" });
  }
}