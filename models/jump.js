const mongoose = require('mongoose');

const jumpSchema = new mongoose.Schema({
    jumpNo: { type: Number, required: true },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    aircraft: { type: String },
    // equipment: { 
    //     type: mongoose.ObjectId,
    //     ref: 'Rig',
    //     required: true
    // },
    equipment: { type: String, required: true },
    altitude: { type: Number, required: true },
    freeFallTime: { type: Number },
    description: { type: String },
    image: { type: String },
    // comments: [commentSchema]
});

module.exports = mongoose.model('Jump', jumpSchema)

