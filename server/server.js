const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var config = require('./config');


var userRoutes = require('./routes/user');
var questionsRoutes = require('./routes/questions');

mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, ()=>{
    console.log("database connected");
})

app.listen(config.PORT_NUMBER, ()=>{
    console.log("server is running on ",config.PORT_NUMBER);
})


app.use(cors())  
app.use(bodyParser.urlencoded({ extended: false,  }))
app.use(bodyParser.json())

app.use('/api/question', questionsRoutes);
app.use('/api/user', userRoutes);

