const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  content: { type: String, required: true },
  field1: String,
  field2: String
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
