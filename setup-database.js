const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/aww.sqlite3');

db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        title TEXT,
        author TEXT,
        datetime INTEGER,
        link TEXT UNIQUE,
        imageurl TEXT UNIQUE)`);
})
db.close();