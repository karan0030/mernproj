const express = require("express");
const app =express();
const port =3000;

app.get('/', (req,res)=> {res.send("hello world")} );

// middleWARE
const admin = (req,res)=> {res.send(" admin dash board")}
const isadmin =(req,res,next)=>{ console.log("admin  middle"); next();}
const islogin =(req,res,next)=>{ console.log("checking login "); next();}

app.get('/admin',islogin,isadmin,admin);




app.listen(port, ()=>{console.log('connection set reaDY to go')});