const Album = require("../../models/entities/Album");
const Composer = require("../../models/relations/Director");
const Cast = require("../../models/relations/Cast");
const ParmsValidator = require("../../util/request_parms_validater");
const sequelize = require("../../util/database");
const Artist = require("../../models/entities/Artist");

module.exports = async (req, res, next) => {
  if (
    ParmsValidator(["albumName", "releaseData", "composers", "casts"], req.body)
  ) {
    return res.json({ message: "Invalid Input", status_code: 406 });
  }
  if (req.file === undefined) {
    return res.json({ message: "Invalid Input", status_code: 406 });
  }
  try {
    await sequelize.transaction(async (transaction) => {
      try {
        const album = await Album.create(
          {
            name: req.body.albumName,
            imageURL: req.file.filename,
            releaseDate: req.body.releaseData,
          },
          { transaction }
        );

        let composers = req.body.composers.split(",");

        for (const id in composers) {
          await Composer.create(
            { albumId: album.id, artistId: composers[id] },
            { transaction }
          );
        }

        let casts = req.body.casts.split(",");

        for (const id in casts) {
          await Cast.create(
            { albumId: album.id, artistId: casts[id] },
            { transaction }
          );
        }

        await transaction.commit();
        return res.json({ status_code: 200, message: "done!" });
      } catch (error) {
        console.log(error);
        transaction.rollback();
        return res.json({ status_code: 403, message: "Internal server error" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.json({ status_code: 403, message: "Internal server error" });
  }
};

