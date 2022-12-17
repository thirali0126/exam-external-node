const mongoose = require ('mongoose');

let mySchema = mongoose.Schema;

let postSchema = new mySchema ({
  title: {type: String, required: true},
  description: {type: String, required: true},
  author: {type: String, required: true},
  datetime: {type: String, required: true}
});

const tableName = 'post';

let data = mongoose.model (tableName, postSchema);

module.exports = data;
