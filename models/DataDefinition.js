// models/DataDefinition.js
const mongoose = require('mongoose');

const dataDefinitionSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  structure: { type: Object, required: true }
});

const DataDefinition = mongoose.model('DataDefinition', dataDefinitionSchema);

module.exports = DataDefinition;
