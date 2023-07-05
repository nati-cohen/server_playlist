const userModel = require("../model/user");

async function create(data) {
  return await userModel.create(data);
}

async function read(filter = {}) {
  return await userModel.find(filter).populate('playlist').populate('favorite')
}

// async function readOne(filter, proj) {
//   return await userModel.findOne(filter, proj).populate('playlist').populate('favorite')
// }

async function readOne(filter = {}, projection) {
  return await userModel.findOne({ ...filter, isActive: true }, projection)
  .populate('playlist favorite')
}



// async function readOne(filter, projection ={}) {
//   return await userModel.findOne({...filter , isActive:true} ,projection)
//   .populate('playlist favorite')
// }

// async function update(email, data) {
//   return await userModel.updateOne(email, data);
// }

async function update(email, object) {
  return await userModel.updateOne(
    { email, isActive: true },
    { ...object}

  );
}



async function del(email) {
  return await updateByemail(email , { isActive: false });
}


module.exports = { create, read, readOne, update, del };