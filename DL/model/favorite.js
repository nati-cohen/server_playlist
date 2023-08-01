const mongoose = require("mongoose");
require('./song')
require('./user')
const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Assuming your user model is named 'User'
    required: true
  },
  userid:{
    type:String,
    required: true

  },
  songs : [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'song', // Assuming your song model is named 'Song'
        required: true
      } 
  ]});

const favoriteModel = mongoose.model("favorite", favoriteSchema);
module.exports = favoriteModel;