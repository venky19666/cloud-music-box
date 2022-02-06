const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const bcrypt = require('bcryptjs');
const Tokens = sequelize.define('admin_tokens', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value){
      const hash = bcrypt.hashSync(value);
      this.setDataValue('token',hash);
    }
  },
  client_secrect: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: true
});

module.exports = Tokens;