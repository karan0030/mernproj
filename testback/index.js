const express = require("express");
const app =express();
const port =3000;

app.get('/', (req,res)=> {res.send("hello world")} );

const admin = (req,res)=> {res.send(" admin dash board")}

app.get('/admin',admin);
app.listen(port, ()=>{console.log('connection set reaDY to go')});