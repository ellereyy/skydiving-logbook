const mongoose = require('mongoose');
const rigSchema = require('./rig.js');


const jumpSchema = new mongoose.Schema({
    jumpNo: { type: Number, required: true },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    aircraft: { type: String, required: true },
    equipment: { type: String },
    altitude: { type: Number, required: true },
    freeFallTime: { type: Number },
    description: { type: String },
    image: { type: String },
    rig: { type: mongoose.Schema.Types.ObjectId, ref: 'Rig' }
});

module.exports = mongoose.model('Jump', jumpSchema)

    // equipment: { 
    //     type: mongoose.ObjectId,
    //     ref: 'Rig',
    //     required: true
    // },

        // rig: [rigSchema],
