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
    db.Rig.find({})
        .then(rigs => res.render('new-jump', {
            rigs: rigs
        }))
})

// CREATE / POST / CREATE / new-jump.ejs / creates new jump and redirects to show page 
router.post('/', (req, res) => {
    db.Jump.create(req.body)
        .then(jump => res.redirect('/jumps/' + jump._id))
})

// SHOW / GET / READ / jump-details.ejs / display individual jump by id
router.get('/:id', function (req, res) {
    // find by the jump by ID using URL parameter
    db.Jump.findById(req.params.id)
        .then(jump => {
            // use the jump documents rig property to query rig 
            db.Rig.findById(jump.rig)
            // render the show page with jump and rig documents 
                .then(rig => {res.render('jump-details', {
                    jump: jump,
                    rig: rig
                })
            })
        })
})


// EDIT / GET / READ / edit-jump.ejs / user can edit jump info 
router.get('/:id/edit', (req, res) => {
    // find the jump document by ID using URL parameter
    db.Jump.findById(req.params.id)
        .then(jump => {
            // use the jump document's rig property to query the rig 
            db.Rig.find({})
                .then(rigs => {
                    // render the edit page with jump and rigs documents
                    res.render('edit-jump', {
                        jump: jump,
                        rigs: rigs
                    });
                });
        })
});


// UPDATE / PUT / UPDATE / edits jump document using form data & redirects user to show page
router.put('/:id', (req, res) => {
    db.Jump.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(jump => res.redirect('/jumps/' + jump._id))
})

// DESTROY / DELETE / DELETE / deletes a jump document 
router.delete('/:id', (req, res) => {
    db.Jump.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/jumps'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
