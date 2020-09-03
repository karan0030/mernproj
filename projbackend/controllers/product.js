const Product =require("../models/product")
const _ =require("lodash")
const fs= require("fs")
const formidable = require("formidable")
const { check, validationResult } = require("express-validator");


exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};


exports.createProduct =(req,res)=>{
    let form =new formidable.IncomingForm();
    form.keepExtensions=true;
    
    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(404).json({error:" problem with image"})
        }
        
        const {name,description,price,stock,category}=fields;
        if(
            !name ||
            !description|| 
            !price ||
            !stock ||
            !category
            ){
            return res.status(400).json({error:"ALL fields required"})
        }


        let product = new Product(fields)

        if(file.photo){
            if(file.photo.size >3000000){
                return res.status(400).json({error:"photo size to big"})
            }
            
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType =file.photo.type;
        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({error:"unable to save"})
            }
             res.json(product)
        })

        
    })

}

exports.getProduct =(req,res)=>{

    req.product.photo=undefined
     return res.json(req.product)
}

exports.getPhoto =(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}


exports.deleteProduct =(req,res)=>{
    let product =req.product;
	console.log("here -- ",product, req.product)
    product.remove((err,remProduct)=>{
        if(err){
            return res.status(400).json({error:"Delete of product fail"})
        }

        res.json({message:" product removed succesfully"})
    })
}


exports.updateProduct =(req,res)=>{
    let form =new formidable.IncomingForm();
    form.keepExtensions=true;
    
    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(404).json({error:" problem with image"})
        }
        let product = req.product
           product=		_.extend(product,fields)

        if(file.photo){
            if(file.photo.size >3000000){
                return res.status(400).json({error:"photo size to big"})
            }
            
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType =file.photo.type;
        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({error:"unable to product "})
            }
             res.json(product)
        })

        
    })

}

exports.getAllUniqueCategory =(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({error:"No category !!"})
        }
        res.json(category)
    })
}

exports.getAllProduct =(req,res)=>{
    let limit = req.query.limit? parseInt(req.query.limit):8
    let sortBy =req.query.sortBy ?req.query.sortBy:"_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit).exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({error:"no Product found!!"})
        }

        res.json(product)
    })

}

exports.updateStock =(req,res,next)=>{
      console.log("in update stock");
    let myOperation =req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperation,{},(err,products)=>{
        if(err){
            return res.status(400).json({error:"Bul update fail"})
        }
        next();
    })
}