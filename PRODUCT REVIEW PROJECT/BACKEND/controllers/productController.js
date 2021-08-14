
exports.getAllProducts = (req, res, next) => {
    req.db.collection('products').find().toArray()
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
};

exports.getProdBySku = (req, res, next) => {
    const collection=req.db.collection('products');
    // db.createIndex({'prodSku':1});
    collection.findOne({'prodSku':req.params.prodSku})
    .then(result => {
        if(!result){
            res.json({message:'There is no such product'})
        }
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
    const collection=req.db.collection('products');
    collection.updateOne({"prodSku":req.params.prodSku},{$set:req.body})
    .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err)
      );
};

exports.deleteProdBySku=(req, res, next) => {
    req.db.collection('products').deleteOne({'prodSku':req.params.prodSku})
    .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err)
      );
};



