const mysql = require("mysql");
const con = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'restaurantdb',
    // port: 33065
    host: 'mysql-restaurantdb.alwaysdata.net',
    user: '295234_user',
    password: 'D5~a9u&bD6wyT/Va',
    database: 'restaurantdb_1',
    port: 3306
});

con.connect(
    (err)=>{
        if(!err){
            console.log('Conexión establecida a DB');
        }else{
            console.log('Error de conexión');
        }
    }
);
module.exports=con;