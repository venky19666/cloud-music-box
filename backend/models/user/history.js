const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const history = sequelize.define('history',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    // userId: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    // albumId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: Sequelize.DATE
    }
},{timestamps: false});

module.exports = history;