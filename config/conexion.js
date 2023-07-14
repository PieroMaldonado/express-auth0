require('dotenv').config();
const mysql = require("mysql");
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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