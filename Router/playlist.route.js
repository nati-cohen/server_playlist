const
    express = require('express'),
    router = express.Router()

const playlistServices = require('../BL/playlist.service')


//login
router.post('/login',async (req, res)=>{
    try{
        const data = req.body
        userServices.login(data)
        res.send(data)
    }
    catch(err){
        res.status(400).send(err)

    }
})

// register
router.post('/register',async (req, res)=>{
    try{
        const data = req.body
        userServices.register(data)
        res.send(data)
    }
    catch(err){
        res.status(400).send(err)

    }
})



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