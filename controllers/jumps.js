/* 
---------------------------------------------------------------------------------------
ROUTES WITH /JUMPS PREFIXES 
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// INDEX / GET / READ / jump-index.ejs
// Index Route (GET/Read): Will display all jumps
router.get('/', function (req, res) {
    db.Jump.find({})
        .then(jumps => res.json(jumps))
})


// SHOW / GET / READ / jump-details.ejs
// Show Route (GET/Read): Will display an individual jump document, using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Jump.findById(req.params.id)
        .then(jump => res.json(jump))
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
