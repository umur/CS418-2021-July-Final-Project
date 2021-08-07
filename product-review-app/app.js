var express = require('express');
var path = require('path');
let mongoConnect = require("./db/database").mongoConnect;


const user = require('./routes/user');
// var testRouter = require('./test');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use('/', user);
// app.use('/test', testRouter);


// error handler
app.use(function(err, req, res, next) {
res.json({status:"error"})
});

mongoConnect(()=>{
  app.listen(3000);
})
