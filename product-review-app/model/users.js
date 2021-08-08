
const getDB = require("../db/database").getDB;
const ObjectId = require('mongodb').ObjectId;

class User {
  constructor(id,username,firstname,lastname,password,role) {
    this._id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.role = role;
  }


  static deleteUser(id) {
    const db = getDB();
    return db.collection('user')
        .deleteOne({ _id: new ObjectId(id) });
}

  static findAll() {
    const db = getDB();
    return db.collection("user").find().toArray();
  }

  save() {
    const db = getDB();
    db.collection('user')
    .insertOne(this)
    .then(result => {
    console.log(result);
    })
    .catch(err => console.log(err));
  }


  updateUser() {
    const db = getDB();
    return db.collection('user')
        .updateOne({ _id: new ObjectId(this._id) }, {
            $set: {
              username:this.username,
              firstname:this.firstname,
              lastname:this.lastname,
              password:this.password,
              role:this.role
            }
        });
}
  

static findById(id) {
  const db = getDB();
  return db.collection('user')
      .findOne({ _id: new ObjectId(id) });
}


login(){
  const db = getDB();
  return db.collection('user')
      .findOne({username:{$eq:this.username, password:{$eq:this.password}}});
}
}

module.exports = User;

