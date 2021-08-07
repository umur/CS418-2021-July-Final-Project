const getDB = require("../db/database").getDB;

class User {
  constructor(username,password) {
    this.username = username;
    this.password = password;
  }

  static findAll() {
    const db = getDB();
    return db.collection("user").find().toArray();
  }

  checkUserName() {
    if (users.length === 0) {
      return -1;
    } else {
      return users.findIndex((item) => item.username === this.username);
    }
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
