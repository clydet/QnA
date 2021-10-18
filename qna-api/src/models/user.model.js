const pool = require('./connection.pool');

const getAllUsers = () => {
  const query = 'SELECT * FROM users;';
  return pool.query(query, []);
};

const insertUser = async (user) => {
  const query = 'INSERT INTO users ("firstName", "lastName", "email") VALUES ($1, $2, $3);';
  await pool.query(query, [user.firstName, user.lastName, user.email]);
};

const deleteUsers = async () => {
  const query = 'DELETE FROM users;';
  await pool.query(query, []);
};

module.exports.User = {
  getAllUsers,
  insertUser,
  deleteUsers
};
