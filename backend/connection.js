const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    // port:process.env.DB_PORT,
    // host:process.env.HOST,
    // user:process.env.DB_USERNAME,
    // password:process.env.DB_PASSWORD,
    // database:process.env.DB_NAME
    port:3306,
    host:'localhost',
    user:'root',
    password:'root',
    database:'cafenodejs'
});



connection.connect((err)=>{
    if(!err){
        console.log('Database Connected')
    }else{
// console.log(connection)

        console.log(err)
    }
})

module.exports = connection;