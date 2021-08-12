const express = require('express');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const connectoinString = 'mongodb+srv://root:123@cluster0.wpzy5.mongodb.net/final_project?retryWrites=true&w=majority'


const authorizeRouter = require('./routes/auth.js');
const indexRouter = require('./routes/index');
const jwtManager = require('./model/jwtManager');
const users = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
let db ={status:"faild"};
app.use((req, res, next) => {
  MongoClient.connect(connectoinString, { useUnifiedTopology: true })
    .then(client => {
      db = client.db('final_project');
      req.db = db;
      if (req.url === '/authorize') {
        // console.log(req.url);
        next();
        return;
      }
      const header = req.headers.authorization;
      if (!header) {
        return res.json({ status: 'auth_error' });
      } else {
        const jwt = new jwtManager();
        const data = jwt.verify(header.split(' ')[1]);
        if (!data) {
          return res.json({ status: 'auth_err', message:"Please login first" });
        }
        if (req.url == '/users' && data.role != "superuser") {
          return res.json({ status: 'unauthorize user' });
        }
        next();
      }
    })
    .catch(err => console.log('Error:', err));
});

app.use('/', indexRouter);
app.use('/authorize', authorizeRouter);
app.use('/users',users);

// error handler
app.use(function (err, req, res, next) {
  res.json({ status: 'error' });
  console.log(err);
});
app.listen(3000);
