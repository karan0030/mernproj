const mongoose =require("mongoose")
const crypto=require('crypto');
const uuidv1 = require('uuid/v1');

var Schema =mongoose.Schema

var userSchema = new Schema({
   name:{
       type:String,
       required:true,
       trim:true,
       maxLength:32,
   },
   lastname:{
    type:String,
    trim:true,
    maxLength:25,
   },
   email:{
       type:String,
       required:true,
       unique:true,
       trim:true,
       maxLength:100,
   },
   userinfo:{
       type:String,
       trim:true
   },
   encry_password:{
       type: String,
       required:true
   },
   salt:String,
   role:{
       type:Number,
       default:0,

   },
   purchase:{
       type:Array,
       default:[]
   }

  },
  {timestamps:true}
  );
 
  userSchema.virtual("password")
      .set(function(password){
        this._password =password
        this.salt=uuidv1();
        this.encry_password= this.securedPassword(password);
      })
      .get(function(){
          return this._password
      })
      


  
 userSchema.methods= {

     authenticate : function(plain_password){
         return this.securedPassword(plain_password)===this.encry_password;
     },
     securedPassword :function(plain_password){
         if(!plain_password) return ""
         try {
             return crypto.createHmac('sha256', this.salt).update(plain_password).digest('hex');
         } catch (err) {
             return ""
             
         }
     }
 }

  module.exports=mongoose.model("User", userSchema)