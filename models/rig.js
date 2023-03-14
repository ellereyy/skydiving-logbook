const mongoose = require('mongoose');

const rigSchema = new mongoose.Schema({
  name: {type: String, required: true },
  container: { type: String, required: true },
  reserve: { type: String, required: true },
  main: { type: String, required: true },
  aad: { type: String, required: true },
  image: { type: String },
  aadServiceDue: { type: Date },
  reserveRepackDue: { type: Date },
});

module.exports = mongoose.model('Rig', rigSchema)