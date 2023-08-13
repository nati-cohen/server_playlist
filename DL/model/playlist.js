const mongoose = require("mongoose");
require('./user')
require('./song')
const playlistSchema = new mongoose.Schema({
  name:{
    type: String, 
    required: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  songPlaylist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'song',
      require: true,
    },
  ],
  
});

const playlistModel = mongoose.model("playlist", playlistSchema);
module.exports = playlistModel;
