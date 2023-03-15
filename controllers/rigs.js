/* 
---------------------------------------------------------------------------------------
ROUTES WITH /RIGS PREFIXES 
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
// INDEX / GET / READ / rig-index.ejs / display all rigs
router.get('/', function (req, res) {
    db.Rig.find({})
        .then(rigs => 
            res.render('rigs/rig-index', {
               rigs: rigs 
            }))
})


// NEW / GET / READ / new-rig.ejs / display form for user to add new rig
router.get('/new', (req, res) => {
    res.render('rigs/new-rig')
})

// CREATE / POST / CREATE / new-rig.ejs / creates new rig and redirects to show page 
router.post('/', (req, res) => {
    db.Rig.create(req.body)
        .then(rig => res.json(rig))
})

// SHOW / GET / READ / rig-details.ejs / display individual rig by id
router.get('/:id', (req, res) => {
    db.Rig.findById(req.params.id)
        .then(rig => {
            res.render('rigs/rig-details', {
                rig: rig
            })
        })
})

// EDIT / GET / READ / edit-rig.ejs / user can edit rig info 
router.get('/:id/edit', (req, res) => {
    db.Rig.findById(req.params.id)
        .then(rig => res.render('rigs/edit-rig', {
            rig: rig
        }))
})

// UPDATE / PUT / UPDATE / edits rig document using form data & redirects user to show page
router.put('/:id', (req, res) => {
    db.Rig.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(rig => res.redirect('/rigs/' + rig._id))
})

// DESTROY / DELETE / DELETE / deletes a jump document 
router.delete('/:id', (req, res) => {
    db.Rig.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/rigs'))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
