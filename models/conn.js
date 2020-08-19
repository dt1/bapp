const sqlite3 = require('sqlite3').verbose();
var path = require('path')

db_path = path.join(__dirname, 'db.db');

const db = new sqlite3.Database(db_path , (err) => {
    if (err){
        console.log('err' + err);
    }

    console.log('connected to db');
});


module.exports = db;
