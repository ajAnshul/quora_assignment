const express = require('express');
const QuestionModel = require('../models/question');
const router = express.Router();



router.post('/', function(req, res){
    QuestionModel.createQuestion(req.body, (err, question)=>{
        if(err){
            res.json({
                success:false,
                err
            })
        }else{
            res.json({
                success:true,
                question
            })
        }
    })
})

router.get('/', function(req, res){
    QuestionModel.fetchAll(req.body, (err, questions)=>{
        if(null){
            res.json({
                success:false,
                err
            })
        }else{
            res.json({
                success:true,
                questions
            })
        }
    })
})


module.exports = router;