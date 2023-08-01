const
    express = require('express'),
    router = express.Router()

const userServices = require('../BL/user.service')
const userController = require('../DL/controller/user.controller')
const auth = require('../auth')



router.post('/register' ,async (req, res) => {
    try {
        const result = await userServices.register(req.body)
        res.send(result)
        console.log(result);
    } catch (err) {
        res.status(err.code).send(err.message)
    }
})

// //login
router.post("/login", async (req, res) => {
    // console.log(req.body);
    try {
      const result = await userServices.login(req.body);
      res.send(result);
    } catch (error) {
      res.status(error.code).send(error.msg);
    }
  });




// get user
router.get('/user',async (req, res)=>{
    try{
        const result = await userServices.getUser(req.body)
        res.send(result)
    }
    catch(err){
        res.status(400).send(err)
    }
})


module.exports = router

