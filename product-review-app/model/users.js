const getDB = require("../db/database").getDB;

class User {
  constructor(username,password) {
    this.username = username;
    this.password = password;
  }


  deleteUser(id){
    let db = getDB();
    return db.collection('user').findByIdAndRemove({_id: new Object(id)})
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




}

module.exports = User;
