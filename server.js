const express = require("express");
const app = express();
require('dotenv').config({ path: '../.env' });
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const path = require('path')

app.use(express.json()); 
app.use(morgan('dev')) ;

main().catch(err => console.log(err))
async function main(){
//Conect DB mongodb+srv://voter-1:Kibeth13!@cluster0.pvl01.mongodb.net/RockTheVote
mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://voter-1:Kibeth13!@cluster0.pvl01.mongodb.net/RockTheVote')
  console.log("Connected to the DB")
}
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}));
app.use('/auth', require("./routes/authRouter.js"));
app.use('/api/issue', require("./routes/issueRouter"));
app.use('/api/comment', require("./routes/commentRouter"));
app.use('/api/user', require("./routes/userRouter.js"));
app.use('/public', require("./routes/publicRouter"));

app.use((err, req, res, next) => {
  console.log(err)
    if(err.name === "Unauthorized Error"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
});

const PORT = process.env.PORT || 9000;

if(process.env.NODE_ENV === 'PROD'){
  app.use(express.static('voting/build'));
  app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'voting', 'build', 'index.html')); //relative path
  })
}



app.listen(PORT, () => { 
    console.log(`The App is listening on port ${PORT}`)
});