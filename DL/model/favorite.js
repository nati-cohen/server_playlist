const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    ref: "user"
  },
  playlist: [
    {
      title: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      thumbnail: {                  //thumbnail.url
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      
    },
  ],
});

const favoriteModel = mongoose.model("favorite", favoriteSchema);
module.exports = favoriteModel;