var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Mongoconnect = require('mongodb').MongoClient;

 

var usersRouter = require('./routes/users');
const { MongoClient } = require('mongodb');

 

var app = express();

 

const url = 'mongodb+srv://elaine:1511@cluster0.xsmkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

 

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) {
    return console.log(err);
  }
  const db = client.db('productreview');
  console.log('MongoDB Connected');
});

 

 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 

app.use('/users', usersRouter);

 

app.post('/sign_up', (req,res)=>{
  let name = req.body.name;
  let email =req.body.email;
  let pass = req.body.password;
  let phone =req.body.phone;

 

  let data = {
      "name": name,
      "email":email,
      "password":pass,
      "phone":phone
  };
  res.json({status:'sucess sign up'});
});

 

app.get('/', (req, res) => {
  res.send('WELCOME TO OUR PRODUCT REVIEW APPLICATION');
});

 

 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

 

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 

app.listen(3000, () => {
  console.log('server is running at 3000')
});