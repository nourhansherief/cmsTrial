// models/DataList.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Data List Schema
const dataListSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  dataDefinition: { type: mongoose.Schema.Types.ObjectId, ref: 'DataDefinition', required: true },
  records:[{
    _id: { type: Schema.Types.ObjectId, auto: true },
    data: { type: Object, required: true   }
  }]
});

const DataList = mongoose.model('DataList', dataListSchema);

module.exports = DataList;


