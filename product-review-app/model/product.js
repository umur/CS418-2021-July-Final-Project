const getDB = require('../db/database').getDB;
const ObjectId = require('mongodb').ObjectId;

class Product {
    constructor(id, title, price) {
        this._id = id;
        this.title = title;
        this.price = price;
    }
    static findAll() {
        const db = getDB();
        return db.collection('products')
            .find()
            .toArray();
    }
    save() {
        const db = getDB();
        return db.collection('products')
            .insertOne(this);
    }
}

module.exports = Product;