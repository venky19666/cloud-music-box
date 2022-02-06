const sequelize = require('../../util/database');

const songMoodRelation = sequelize.define('songMoodData',{
},{timestamps: false});

songMoodRelation.removeAttribute('id');

module.exports = songMoodRelation;