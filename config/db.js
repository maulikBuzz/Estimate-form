var mysql = require("mysql");

var confData = {
  multipleStatements: true,
  host: "localhost",
  user: "root",
  database: "estimates",
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
};

var pool = mysql.createPool(confData);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Db connected !!!');
    connection.release();  // Release the connection back to the pool
});
 
module.exports = pool;  
    