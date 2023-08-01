const songModel = require('../model/song')


async function create(data){
    return await songModel.create(data)
}
async function read(filter = {}){
await songModel.find(filter)
}
async function readOne(filter = {}){
const result = await songModel.findOne(filter)
return result
}
async function readOneLogin(filter = {},proj){
const result = await songModel.findOne(filter,proj)
return result
}
async function update(filter,newData){
return await songModel.updateOne(filter,{newData})
}

async function updateAndReturn(filter, newData){
  let data = await songModel.findOneAndUpdate(filter,newData,{new:true})
  return  data
}
async function del(){
    return await songModel.updateOne()

}

module.exports={create,read,readOne,update,del,updateAndReturn,readOneLogin}