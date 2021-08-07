var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;


var indexRouter = require('./routes/index');
// var testRouter = require('./test');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let connect

app.use((req,res,next)=>{
  if(!connect){
    console.log("connected...")
    MongoClient.connect('mongodb+srv://Asgedom:Asgedom@cluster0.dg7cy.mongodb.net/shopDB?retryWrites=true&w=majority', { useUnifiedTopology: true })
         .then(client => {
            connect = client.db('shopDB');
          req.db = connect;
          next();
        })
        .catch(err => console.log('Error: ', err));
  }else{
    req.db = connect
    next();
  }
})

app.get('/test',(req,res)=>{
  req.db.collection('item').findOne()
  .then(data=>{
    res.json(data)
    console.log(data);
  })
})


app.use('/', indexRouter);
// app.use('/test', testRouter);


// error handler
app.use(function(err, req, res, next) {
res.json({status:"error"})
});

app.listen(3000);



