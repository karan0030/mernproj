const { Order, ProductCart } = require("../models/order")

exports.getOrderById =(req,res,next,id)=>{
    Order.findById(id).
    populate("products.product","name price").
    exec((err,order)=>{
        if(err||!order){
            return res.status(400).json({error:"No order found"})
        }
        req.order=order;
        next();
    })
}

exports.createOrder =(req,res)=>{
    req.body.order.user =req.profile
	console.log(" ** order create")
    const order = new Order(req.body.order)
    order.save((err,order)=>{
        if(err){
			console.log(err)
            return res.status(400).json({error:" order not saved in DB"})
        }
		console.log("all good")
        res.json(order)
    })
}
exports.getAll =(req,res)=>{
    Order.find().populate("user","_id name").exec((err,order)=>{
        if(err){
            return res.status(400).json({error:"Error in getting"})
        }

        res.json(order)
    })
}

exports.getOrderStatus =(req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateOrderStatus =(req,res)=>{
    Order.update(
        {_id:req.body.orderId},
         {$set:{status:req.body.status}},
         (err,order)=>{
            if(err){
                return res.status(400).json({error:"Error in updating order status"})
            } 
            res.json(order) 
         }
    )
}