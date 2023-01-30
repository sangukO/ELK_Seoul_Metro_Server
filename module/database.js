var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var db_info = {
    host: 'localhost',
    port: '3306',
    user     : process.env.MySQL_DATABASE_USERNAME,
    password : process.env.MySQL_DATABASE_PASSWORD,
    database : process.env.MySQL_DATABASE_NAME
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}