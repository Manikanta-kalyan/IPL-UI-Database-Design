const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Shailesh@86",
    host: "localhost",
    port: 5432,
    database: "DMQLProject"
});

module.exports = pool;