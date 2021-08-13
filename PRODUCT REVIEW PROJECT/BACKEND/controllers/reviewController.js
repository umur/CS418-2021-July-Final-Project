const ObjectId = require('mongodb').ObjectId;


exports.getAllReview = (req, res, next) => {
    req.db.collection('review').find().toArray()
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
}

exports.getReviewById=(req,res,next)=>{
    req.db.collection('reviews').findOne({_id:new ObjectId(req.params.id)})
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err));
}

exports.getReviewByProdSku = (req, res, next) => {
    req.db.collection('products').findOne({ 'prodSku': req.params.prodSku })
    then(result => {
        res.json(result);
    })
        .catch(err => console.log(err));
}

exports.addReview = (req, res, next) => {
    const collectionProd = req.db.collection('products');
    const collectionUser = req.db.collection('user');
    const collectionReview = req.db.collection('reviews');

    collectionUser.findOne({ 'username': req.user.username })
        .then(user => {
            collectionProd.findOne({ 'prodSku': req.params.prodSku })
                .then(prod => {
                    const reviews = [{
                        user: {
                            username: user.username,
                            id: new ObjectId(user._id)
                        },
                        product: {
                            prodSku: prod.prodSku,
                            name: prod.name
                        },
                        text: req.body.text,
                        rating: req.body.rating,
                        date: new Date(),
                    }];
                    collectionReview.insertOne(reviews)
                        .then(result => {
                            collectionUser.updateOne({ 'username': req.user.username }, {
                                $addToSet: {
                                    review: {
                                        id: result._id,
                                        product: result.product,
                                        text: result.text,
                                        rating: result.rating
                                    }
                                }
                            });
                            collectionProd.updateOne({ 'prodSku': req.params.prodSku }, {
                                $addToSet: {
                                    review: {
                                        id: result._id,
                                        username: result.user,
                                        text: result.text,
                                        rating: result.rating
                                    }
                                }
                            });
                            let point;
                            if (req.body.rating == 'bad') {
                                point = -1;
                            } else if (req.body.rating == 'excellent') {
                                point = 2;
                            } else {
                                point = 0;
                            }
                            collectionProd.updateOne({ 'prodSku': req.body.prodSku }, { $set: { 'reputation': prod.reputation + point } });

                            res.json({ message: 'Review is added' }, result);
                        });
                })
        })
};

exports.updatedReview = (req, res, next) => {
    const collectionProd = req.db.collection('products');
    const collectionUser = req.db.collection('user');
    const collectionReview = req.db.collection('reviews');
    const objId = new ObjectId(req.params.id);

    collectionReview.findOne({ "_id": objId })
        .then(result => {
            if (!result) {
                res.json({ message: 'There is no such review' });
            } else {
                collectionReview.updateOne({ '_id': result._id }, { $set: { 'text': req.body.text, 'rating': req.body.rating } })
                    .then(data => {
                        collectionProd.updateOne({ 'review.id': objId }, { $set: { 'text': req.body.text, 'rating': req.body.rating } });
                        collectionUser.updateOne({ 'review.id': objId }, { $set: { 'text': req.body.text, 'rating': req.body.rating } });
                        res.json({ message: 'Review is updated', result });
                    })
            }
        })
        .catch(err => console.log(err)
        );
}

exports.deletedReview = (req, res, next) => {
    const collectionProd = req.db.collection('products');
    const collectionUser = req.db.collection('user');
    const collectionReview = req.db.collection('reviews');
    const objId = new ObjectId(req.params.id);

    collectionReview.deleteOne({ "_id": new ObjectId(req.params.id) })
        .then(result => {
            collectionProd.updateOne({ 'review.id': objId }, { $pull: { 'review': { 'id': objId } } });
            collectionUser.updateOne({ 'review.id': objId }, { $pull: { 'review': { 'id': objId } } });
            res.json({ message: 'Review is deleted', result });
        })
        .catch(err => console.log(err)
        );
}
