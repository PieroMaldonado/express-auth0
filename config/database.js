const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    // host     : 'localhost', // MYSQL HOST NAME
    // user     : 'root', // MYSQL USERNAME
    // password : '', // MYSQL PASSWORD
    // database : 'restaurantdb', // MYSQL DB NAME
    // port: 33065
    host     : 'mysql-restaurantdb.alwaysdata.net', // MYSQL HOST NAME
    user     : '295234_user', // MYSQL USERNAME
    password : 'D5~a9u&bD6wyT/Va', // MYSQL PASSWORD
    database : 'restaurantdb_1', // MYSQL DB NAME
    port: 3306
}).promise();
module.exports = dbConnection;