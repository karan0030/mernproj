const mongoose =require("mongoose")
const {ObjectId}= mongoose.Schema
var Schema =mongoose.Schema;

var ProductCartSchema =new Schema({
    product:{
        type: ObjectId,
        ref:"Product"
    },
    name: String,
    count:Number,
    price:Number
},{timestamps:true}
);

const ProductCart =mongoose.Schema("ProductCart",ProductCartSchema)

var OrderSchema =new Schema({
    product:[ProductCartSchema],
    transaction_id:String,
    amount:{ type:Number},
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{ timestamps:true}
);

const Order =mongoose.Schema("Order",OrderSchema)

module.exports={Order,ProductCart};