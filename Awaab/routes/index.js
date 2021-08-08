const express = require('express');
const router = express.Router();
const JwtManager = require("../model/jwtManager");
const jwt = new JwtManager();
/* GET home page. */
router.get('/', (req, res, next)=> {
  const header = req.headers.authorization;
  const verify = jwt.verify(header.split(" ")[1]);
  if (verify.role == "Admin") {
    req.db.collection('users').findOne()
  .then(data=>{
    res.json({
      status: "success",
      data: data
    });
  })
  }else{
    res.json({status:'fail', message:"unauthorize user"});
  }
  

  
});
module.exports = router;
