const mysql = require('mysql');

const connection = mysql.createConnection({
    multipleStatements:true,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'restaurant-review'
})

connection.connect(err => {
    if (err) throw err;
    console.log(`MySQL Connected`)
})

module.exports = connection;