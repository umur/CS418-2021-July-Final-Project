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

  update() {
    const index = users.findIndex((u) => u.id === this.id);
    if (index > -1) {
      users.splice(index, 1, this); // splice is like copying
      return this;
    } else {
      throw new Error("Not Found");
    }
  }
  login() {
    return users.find(
      (u) => u.username == this.username && u.password == this.password
    );
  }
}

let users = [
  new User(null, "username", null, null, "password", "admin"),
  new User(null, "hello", null, null, "456", "user"),
  new User(null, "aa", null, null, "c", "user"),
];

// users.push(new User(null, "hello", null, null, "123", "admin"));
// users.push(new User(null, "hello", null, null, "456", "user"));
// users.push(new User(null, "aa", null, null, "c", "user"));

module.exports = User;
