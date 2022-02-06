const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const MoodData = sequelize.define('mood',{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
},{timestamps: false});

module.exports = MoodData;