const favoriteModel = require("../model/favorite");


async function create(data) {
  return await favoriteModel.create(data);
}

async function read(filter = {}) {
  return await favoriteModel.find({ ...filter, isActive: true });
}

async function readOne(filter = {}) {
  return await favoriteModel.findOne({ ...filter, isActive: true });
}

async function updateByemail(email, object) {
  return await favoriteModel.updateOne(
    { email },
    { ...object, lastLogin: new Date()}
  );
}

async function del(email) {
  return await updateByname(email , { isActive: false });
}


module.exports = { create, read, readOne, updateByemail , del };