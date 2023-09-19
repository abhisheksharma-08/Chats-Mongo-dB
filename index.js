const express = require('express');
const req = require('express/lib/request');
const app=express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const exp = require('constants');
const methodoverride = require('method-override');
const port=8080;
app.use(methodoverride("_method"));
app.set("views",path.join( __dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// let chat1= new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send nodes ",
//     created_at:new Date()
// });
// chat1.save().then((res)=>{console.log("res")});

app.get("/",(req,res)=>{
    res.send("ok");
})
app.get("/chats",async(req,res)=>{
    chats=await Chat.find({});
    res.render("home.ejs",{chats})
})
app.get("/chats/new",(req,res)=>{
    res.render("create.ejs")
})
app.post("/chats",(req,res)=>{
    let {from,to,msg}= req.body;
    let newchat = new Chat ({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
    newchat.save().then((res)=>{
        console.log("saved");
    }).catch((err)=>{
        console.log("err");
    });
    res.redirect("/chats");
})
app.get("/chats/:id/edit",async(req,res)=>{
   let {id}=req.params;
  let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat})
})
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg: newmsg}=req.body;
    let updatechat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true},{new:true});
    res.redirect("/chats");
})
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    
    let deletedchat=await Chat.findByIdAndDelete(id);
 
    res.redirect("/chats");
})






app.listen(port,()=>{
    console.log("success")
})