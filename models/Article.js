var mongoose = require("mongoose");

// establishing the schema
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

// creating the schema contructor for mongo
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});


var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
