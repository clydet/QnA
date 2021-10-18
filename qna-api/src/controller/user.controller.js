const { User } = require('../models/user.model');

module.exports.getAllUsers = async (req, res) => {
  const users = await User.getAllUsers();
  res.json(users);
};
