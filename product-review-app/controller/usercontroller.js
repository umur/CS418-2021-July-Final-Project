const User = require('../model/users');

exports.getAllUsers = (req, res)=>{
    User.findAll()
    .then(user=>{
        res.json(user)
    })
    .catch(err=>{
        console.log(err);
    })
}


exports.postUser = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = new User(username,password);
    user.save();
    res.json({status:"sucess"});
}
