const { Pool } = require('pg');
const url = require('url');

const params = url.parse(process.env.DB_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  min: 1,
  max: 5
};

const pool = new Pool(config);

module.exports.query = async (text, values) => {
  let res = null;
  const client = await pool.connect();
  try {
    res = await client.query(text, values);
  } catch (err) {
    console.log('ERROR', text, err);
  } finally {
    client.release();
  }
  return res;
};
