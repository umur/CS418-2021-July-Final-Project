const express = require('express');
const path = require('path');
const mongoConnect = require("./db/database").mongoConnect;


const loginRoute = require('./routes/authoRoute')
const userRoute = require('./routes/user');
const productRouter = require('./routes/product');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(loginRoute); 
app.use('/', userRoute);
app.use('/', productRouter);



// error handler
app.use(function(err, req, res, next) {
  console.log(err);
res.json({status:"error"})

});

mongoConnect(()=>{
  app.listen(3000);
})
