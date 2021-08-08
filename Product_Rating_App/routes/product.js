const express = require("express")
const router = express.Router()
const productModel = require("../model/productModel")

router.get('/',(req,res,next)=>{
    productModel.find( (err,products)=>{
    if(err){res.send(err)}
    res.json(products) })
    //res.json({status:"success"})
})

router.get('/:id',(req,res)=>{
    let id = req.params.id
    productModel.findById(id,(err,products)=>{
        if(err){res.send(err)}
        res.json(products)

    })

})

router.post('/', async (req,res,next)=>{ 
    // productModel.create({productName:req.body.productName,
    //     productNumber:req.body.productNumber,productreview:req.body.productreview,
    //     userid:req.body.userid,username:req.body.username},(err,product)=>{
        const newproduct = await productModel.create(req.body)
        res.json({data:newproduct})
})
module.exports = router