
// const ObjectId=require('mongodb').ObjectId;

exports.getAllProducts = (req, res, next) => {
    req.db.collection('products').find().toArray()
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
};

exports.getProdBySku = (req, res, next) => {
    const db=req.db.collection('products');
    // db.createIndex({prodSku:1});
    db.findOne({'prodSku':req.params.prodSku})
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err));
};

exports.addProducts=(req,res,next)=>{
    const newProd={
        prodSku:req.body.prodSku,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        reviews:[],
        reputation:0
    }
    req.db.collection('products').insertOne(newProd)
            .then(data => {
              res.json({ message: 'New product is added', data });
            })
            .catch(err => console.log(err));
  };

exports.updateProdBySku=(req, res, next) => {
    const updatedProd=req.body;
    const db=req.db.collection('products');
    db.updateOne({"prodSku":req.params.prodSku},{$set:{updatedProd}})
    .then(data => {
        res.json({ message: 'Product is updated', data });
      })
      .catch(err => console.log(err)
      );
};

exports.deleteProdBySku=(req, res, next) => {
    req.db.collection('products').deleteOne({'prodSku':req.params.prodSku})
    .then(data => {
        res.json({ message: 'Product is deleted', data });
      })
      .catch(err => console.log(err)
      );
};

exports.addReview=(req,res,next)=>{
  
    const db=req.db.collection('products');
    const reviews=[{
        username:req.body.username,
        prodSku:req.body.prodSku,
        review:req.body.review,
        date: new Date(),
        rating:req.body.rating
    }];
 
    let sum;
    for(let i=0;i<reviews.length;i++){
        if(reviews[i].rating=='good'){
            sum=0;
        }else if(reviews[i].rating=='excellent'){
            sum=sum+2;
        }else{
            sum=sum-1;
        }
    }
    db.updateOne({'prodSku':req.body.prodSku},{$push:{'reviews':reviews}},{$set:{'reputation':sum}})
    .then(data => {
        res.json({ message: `Review is added for product ${req.body.prodSku}`, data });
      })
      .catch(err => console.log(err)
      );
    // db.createIndex({'reputation':1}); 
};





