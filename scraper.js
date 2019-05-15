const Parser = require('rss-parser');
const sqlite3 = require('sqlite3').verbose();
const parser = new Parser();
const db = new sqlite3.Database('data/aww.sqlite3');

(async () => {

    // data store for scrape
    let scrape = {
        'posts': []
    };

    // regex pattern for posted images.
    let imageRegex = new RegExp('(https:\/\/i.redd.it\/)(.+)(\.jpg)');

    // Grab the first page of /r/aww
    let feed = await parser.parseURL('https://reddit.com/r/aww/.rss');

    feed.items.forEach(item => {
        let post = {};

        // check post content has a relevant image.
        let findImage = imageRegex.exec(item.content);
        if (findImage === null) {
            return;
        }

        post.title = item.title;
        post.author = item.author;
        post.datetime = Date.parse(item.pubDate);
        post.link = item.link;   
        post.image = findImage[0];
        
        scrape.posts.push(post);
    });

    // Save the posts to the database.
    let savePosts = await db.serialize(function() {
        let stmt = db.prepare("INSERT OR IGNORE INTO posts VALUES (?, ?, ?, ?, ?)");
        scrape.posts.forEach(post => {
            // stmt.run(post.title, post.link, post.author, post.image);
            stmt.run([post.title, post.author, post.datetime, post.link, post.image]);
        });
        stmt.finalize();
    });

})();