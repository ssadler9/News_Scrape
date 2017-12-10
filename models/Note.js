var mongoose = require("mongoose");

// establishing the Schema
var Schema = mongoose.Schema;

// creating schema for notes
var NoteSchema = new Schema({ 
  title: String,
  body: String
});


var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
