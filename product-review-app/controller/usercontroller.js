
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

exports.getuserById = (req,res,next)=>{
    User.findById(req.params.id)
    .then(result=>{
        res.json(result);
    })
    .catch(err => console.log(err));
}

exports.editUser = (req, res, next) => {
    const role = "user";
    const updatedUser = new User(req.params.id,req.body.username,req.body.firstname, req.body.lastname, req.body.password,role);
    console.log(updatedUser);

    updatedUser.updateUser()  
        .then(result => {
            res.json({status:"success"})
        })
        .catch(err => console.log(err));
}

exports.postUser = (req, res)=>{
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const role = "user"

    const user = new User(null,username,firstname,lastname,password,role);
    user.save();
    res.json({status:"sucess"});
}
