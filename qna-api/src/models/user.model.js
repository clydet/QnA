const pool = require('./connection.pool');

const getAllUsers = () => {
  const query = 'SELECT * FROM users;';
  return pool.query(query, []);
};

const insertUsers = async (users) => {
  const query = 'INSERT INTO users ("firstName", "lastName", "email") VALUES ($1, $2, $3);';
  await users.forEach(async (user) => {
    await pool.query(query, [user.firstName, user.lastName, user.email]);
  });
};

const deleteUsers = async () => {
  const query = 'DELETE FROM users;';
  await pool.query(query, []);
};

module.exports.User = {
  getAllUsers,
  insertUsers,
  deleteUsers
};
