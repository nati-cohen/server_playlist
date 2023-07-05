const
    express = require('express'),
    router = express.Router()

const userServices = require('../BL/user.service')



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


// router.post('/login',async (req, res)=>{
//     try{
//         const data = req.body
//         userServices.login(data)
//         res.send(data)
//     }
//     catch(err){
//         console.log('login', err.message);
//         res.status(err.code).send(err.msg)

//     }
// })

// // register
// router.post('/register',async (req, res)=>{
//     try{
//         const data = req.body
//         userServices.register(data)
//         res.send(data)
//     }
//     catch(err){
//         res.status(400).send(err)

//     }
// })



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




// // update user
// router.put('/:userId',async (req, res)=>{
//     try{
//         const result = await userServices.updatename(req.params.itemId)
//         res.send(result)
       
//     }
//     catch(err){
//         res.status(400).send(err)

//     }
// })

// // delete user
// router.delete('/:userId',async (req, res)=>{
//     try{
//         const result = await userServices.deleteuser(req.params.itemId)
//         res.send(result)
//     }
//     catch(err){
//       res.status(400).send(err)
//     }
// })


// // get all users
// router.get('/',async (req, res)=>{
//     try{
//         const result = await userServices.getAllUsers()
//         res.send(result)
//     }
//     catch(err){
//         res.status(400).send(err)
//     }
// })

