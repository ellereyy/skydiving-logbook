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
// INDEX / GET / READ / jump-index.ejs / display all jumps
router.get('/', function (req, res) {
    db.Jump.find({})
        .then(jumps => 
            res.render('jump-index', {
                jumps: jumps
            }))
})


// SHOW / GET / READ / jump-details.ejs / display individual jump by id
router.get('/:id', function (req, res) {
    db.Jump.findById(req.params.id)
        .then(jump => {
            res.render('jump-details', {
                jump: jump
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
