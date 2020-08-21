# bapp

bapp means "basic app." This app functions, but it doesn't have a major point beyond me learning node.

to run, clone the repo and:

`npm install`

to build the database:

`npm run db`

if you have nodemon, you can run:

`npm run dev`

if you do not have nodemon, you can run:

`DEBUG=myapp:* npm start`

## What's happening.

create a username and password, then press login to go to the home page.

after you log in, you will find a page called musicians. This page allows you to add, edit, and remove musicians.

## I forgot my password

There is no way to run a recovery at this moment. You can either make a new user or blow out the datbase, under `models/db.db` and start over.
