const mongoose = require("mongoose");
require('./song')
require('./playlist')
const userSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  password: { 
    type: String,
     required: true 
    },
    playlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'playlist',
        require: true,
      },
    ],
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song',
        require: true,
      },
    ],
    
  email: { 
    type: String, 
    required: true 
  },
  CreationDate: {
     type: Date,
      default: Date.now 
    },
  lastLogin: {
     type: Date,
    default: Date.now 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  permission: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
}

});



const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
