
const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "pass",
  database: "ums",
});
module.exports = pool;