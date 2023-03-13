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


/* Routes (REST / HTTP / CRUD / EJS / NOTES)
--------------------------------------------------------------- */
// INDEX / GET / READ / jump-index.ejs / display all jumps
router.get('/', function (req, res) {
    db.Jump.find({})
        .then(jumps => 
            res.render('jump-index', {
                jumps: jumps
            }))
})


// NEW / GET / READ / new-jump.ejs / display form for user to add new jump
router.get('/new', (req, res) => {
    res.render('new-jump')
})


// CREATE / POST / CREATE / new-jump.ejs / creates new jump and redirects to show page 
router.post('/', (req, res) => {
    db.Jump.create(req.body)
        .then(jump => res.json(jump))
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

// EDIT / GET / READ / edit-jump.ejs / user can edit jump info 
router.get('/:id/edit', (req, res) => {
    db.Jump.findById(req.params.id)
        .then(jump => res.send('editing jump number ' + jump.jumpNo))
})

// UPDATE / PUT / UPDATE / edits jump document using form data & redirects user to show page
router.put('/:id', (req, res) => {
    db.Jump.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then (jump => res.json(jump))
})

// DESTROY / DELETE / DELETE / deletes a jump document 
router.delete('/:id', (req, res) => {
    db.Jump.findByIdAndRemove(req.params.id)
        .then(jump => res.send('You deleted jump number ' + jump.jumpNo))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
