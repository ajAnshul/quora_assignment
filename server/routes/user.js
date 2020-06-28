const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.post('/signup', function(req, res){
    userModel.createUser(req.body, (err, user)=>{
        if(err){
            res.json({
                success:false,
                err
            })
        }else{
            res.json({
                success:true,
                user
            })
        }
    })
})

router.get('/', (req, res)=>{
    res.json({
        success:true
    })
})


module.exports = router;