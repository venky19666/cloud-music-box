const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const bcrypt = require('bcryptjs');
const Admin = sequelize.define('admin', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneno: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilepic: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  verficationcode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  verficationTime: {
    type: Sequelize.DATE,
    allowNull: true,
  }
}, {
  timestamps: false
});

module.exports = Admin;