const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};


exports.updateUser =(req,res)=>{
User.findByIdAndUpdate(
  {_id:req.profile._id},
  {$set:req.body},
  {new:true, useFindAndModify:false},
  (err,user)=>{
    if(err){
      return res.status(400).json({error:" Not autherised"})
    }
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    res.json(user);
  }
)

}

exports.userPurchaseList =(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user", "_id name")
    .exec((err,order)=>{
      if(err){
        return res.status(400).json({error : " User has no order "})
      }
     return  res.json({order})
    })
}

exports.pushOrderInPurchaseList =(req,res,next)=>{
	console.log("push order")
  let purchase=[]
  req.body.order.products.forEach(product =>{
    purchase.push({
      _id:product._id,
      name:product.name,
      description:product.description,
      category:product.category,
      quantity:product.quantity,
      amount :req.body.order.amount,
      transaction_id:req.body.transaction_id
    })
	next()
  })

  User.findOneAndUpdate(
    {_id:req.profile._id},
    {$push :{purchase:purchase}},
    {new:true},
    (err,purchase)=>{
      if(err){
        return res.status(400).json({error:"unable to update"})
      }
      next();
    }
  ) 
}


// exports.getAll=(req,res)=>{
//   User.find().exec((err,user)=>{
//     if(err||!user){
//       return res.status(404).json({error:" no user !!! "});
//     }

//     res.json(user);
    
//   })}

