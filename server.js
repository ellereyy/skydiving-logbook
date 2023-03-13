/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const jumpsCtrl = require('./controllers/jumps')


/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());


/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.render('home')
});

// When a GET request is sent to `/seed`, the jumps collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing jumps
    db.Jump.deleteMany({})
        .then(removedJumps => {
            console.log(`Removed ${removedJumps.deletedCount} jumps`)
            // Seed the jumps collection with the seed data
            db.Jump.insertMany(db.seedJumps)
                .then(addedJumps => {
                    console.log(`Added ${addedJumps.length} jumps in logbook`)
                    res.json(addedJumps)
                })
        })
});

/* handle all routes beginning with /jumps 
--------------------------------------------------------------- */
app.use('/jumps', jumpsCtrl)


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
