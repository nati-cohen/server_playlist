const playlistModel = require("../model/playlist");


async function create(data) {
  return await playlistModel.create(data);
}

async function read(filter = {}) {
  return await playlistModel.find({ ...filter, isActive: true });
}

async function readOne(filter = {}) {
  return await playlistModel.findOne({ ...filter, isActive: true })
}

async function updateByemail(email, object) {
  return await playlistModel.updateOne(
    { email },
    { ...object, lastLogin: new Date()}
  );
}

async function del(email) {
  return await updateByname(email , { isActive: false });
}


module.exports = { create, read, readOne, updateByemail , del };