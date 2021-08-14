const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const secret = "review-scret";

exports.signUp = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const collection = req.db.collection('users');
    collection.findOne({ 'username': username })
        .then((result) => {
            if (null != result) {
                res.json({ message: 'Username already exists', status: false })
            } else {
                let newUser = new User(username, password);
                collection.insertOne(newUser)
                    .then(data => {
                        res.json({ message: 'User register success', data });
                    })
            }
        });
}

exports.signIn = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const collection = req.db.collection('users');
    collection.findOne({ 'username': username, 'password': password })
        .then((result) => {
            if (null == result) {
                res.json({ message: 'Authentication failed. Invalid user or password.' });
            } else {
                console.log("token now");
                let token = jwt.sign(
                    { username: username, role: result.role }, secret
                );
                res.json({ token, role: result.role, username: username });
            }
        });
}

exports.getUser=(req,res,next)=>{
  req.db.collection('users').findOne({'username':req.params.username})
  .then(result => {
      res.json(result);
  })
  .catch(err => console.log(err));
}

exports.getAllUser=(req,res,next)=>{
  req.db.collection('users').find().toArray()
  .then(result => {
      res.json(result);
  })
  .catch(err => console.log(err));
}

exports.resetPass=(req,res,next)=>{
  const collection=req.db.collection('users');
    collection.updateOne({"username":req.params.username},{$set:{'password':req.body.password}})
    .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err)
      );
}

exports.deleteUser=(req,res,next)=>{
  req.db.collection('users').deleteOne({'username':req.params.username})
    .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err)
      );
}

exports.authorize=(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const jwtToken = authHeader.split(" ")[1];
      try {
        const payload=jwt.verify(jwtToken, secret);
        req.user=payload;
        next();
      } catch (error) {
        res.status(403).json({ error: 'Forbidden' });
      }
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  }

exports.authorizedSuperUser=(req,res,next)=>{
  if(req.user.role=='superUser'){
    next();
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
}


