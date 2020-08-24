# bapp

bapp means "basic app." This app functions, but it doesn't have a major point beyond me learning node.

While each push to this repo should work, there may be some debugging stuff on the pages.

## running

There is no setup needed. The database is sqlite; this and all other items will be pulled from npm.

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

after you log in, you will find a page called musicians. There are other pages, which I hope are self-explantory.

## I forgot my password

There is no way to run a recovery at this moment. You can either make a new user by visiting `/create-account`  or blow out the datbase, under `models/db.db` and start over.
