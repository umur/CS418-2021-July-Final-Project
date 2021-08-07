
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


exports.deleteById = (req, res, next)=>{
    User.deleteUser(req.params.id)
    .then(result => { 
        res.json({status:"success"})
    })
    .catch(err => console.log(err));
}


exports.editUser = (req, res, next) => {
    const updatedUser = new User(req.body._id, req.body.username, req.body.password);
    console.log(updatedUser);

    updatedUser.updateUser()  
        .then(result => {
            res.json({status:"success"})
        })
        .catch(err => console.log(err));
}

exports.postUser = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = new User(username,password);
    user.save();
    res.json({status:"sucess"});
}
