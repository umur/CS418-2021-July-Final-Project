var express = require('express');
var path = require('path');


var indexRouter = require('./routes/index');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);


// error handler
app.use(function(err, req, res, next) {
res.json({status:"error"})
});

app.listen(3000);
