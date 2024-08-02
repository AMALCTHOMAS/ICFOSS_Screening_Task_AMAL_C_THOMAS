const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')

const mongo_url = process.env.MONGODB_CONNECTION_STRING
const port = process.env.PORT

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);

mongoose.connect(mongo_url).then(()=>{
    app.listen(port, ()=>{
        console.log("Server is running on port " +port)
    })
}).catch((err)=>{
    console.log(err)
})