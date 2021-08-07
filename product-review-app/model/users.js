
const getDB = require("../db/database").getDB;
const ObjectId = require('mongodb').ObjectId;

class User {
  constructor(id,username,password) {
    this._id = id;
    this.username = username;
    this.password = password;
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
              password:this.password
            }
        });
}
  

static findById(id) {
  const db = getDB();
  return db.collection('user')
      .findOne({ _id: new ObjectId(id) });
}

}

module.exports = User;

