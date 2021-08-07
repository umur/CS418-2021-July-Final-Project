var express = require('express');
var path = require('path');
let mongoConnect = require("./db/database").mongoConnect;


const userRoute = require('./routes/user');
var productRouter = require('./routes/product');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use('/', userRoute);
app.use('/product', productRouter);


// error handler
app.use(function(err, req, res, next) {
  console.log(err);
res.json({status:"error"})

});

mongoConnect(()=>{
  app.listen(3000);
})
