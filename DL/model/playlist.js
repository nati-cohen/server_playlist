const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
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

const playlistModel = mongoose.model("playlist", playlistSchema);
module.exports = playlistModel;
