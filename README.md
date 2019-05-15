# r/Aww Image Scraper

A bubble-gump and sticky-tape approach to scraping r/Aww for cute jpgs built in NodeJS.

## Getting Started

You'll need a NodeJS environment to get this project running on your local machine. This is far from production code so don't think seriously about putting it into a production environment.

### Prerequisites

Just NodeJS. The app uses sqlite3 as a datastore but when you npm install it's going to download a compatible binary for your system. Check the [node-sqlite3 doc](https://github.com/mapbox/node-sqlite3) for more information about pointing it to an external sqlite3 library.

### Installing

After cloning or downloading the project to your local environment, install all the node dependencies:

```
npm install
```

Then setup the sqlite3 database.

```
npm run setup
```

Now you can run the scraper and save all the image posts from the front page of r/aww with:

```
npm run scraper
```

### Schedule the scraper with cron

The scraper is designed to grab the image posts from the first page of r/aww and then save references to those posts in an sqlite database so you'll need to schedule the scraper to run using something like cron. You can run the scaper as many times as you like and it will only save unique posts to the database - duplicates will be ignored. Based on the activity on r/aww you might want to schedule a scraper cron job for once every hour.

When you setup the cronjob you'll need to add a prefix to the npm command to reference the project path. You might also need to give a full path reference for npm too.

So the line in your crontab file might look something like:

```
5 * * * * /usr/bin/npm run scraper --prefix path/to/project
```