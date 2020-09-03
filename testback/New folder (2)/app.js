require("dotenv").config();

const mongoose= require("mongoose")
const express =require("express")
const bodyParser=require("body-parser")
const cors =require("cors")
const  authRoutes =require("./routes/auth.js")
const  userRoutes =require("./routes/user.js")
const cookieParser =require("cookie-parser");
// const { count } = require("./models/user");

const app=express();


//db connect 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then( ()=> console.log("DATABASE CONNECTED"));



//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//myroutes

app.use("/api",authRoutes)
app.use("/api",userRoutes)


// start server
const port= process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`app is ative on ${port}`); 
})