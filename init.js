const mongoose = require('mongoose');
const Chat = require('./models/chat');
main().then(()=>{
    console.log("connection successfull")
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }


  allchat=[{
      from:"neha",
      to:"priya",
      msg:"send nodes ",
      created_at:new Date()
  },
  {
    from:"abhishek",
    to:"aman",
    msg:"send nodes ",
    created_at:new Date()
},
{
    from:"kunal",
    to:"abhishek",
    msg:"send nodes ",
    created_at:new Date()
},
{
    from:"tanish",
    to:"adva",
    msg:"send nodes ",
    created_at:new Date()
},
{
    from:"eva",
    to:"dom",
    msg:"send nodes ",
    created_at:new Date()
},
{
    from:"abhishek",
    to:"popi",
    msg:"send nodes ",
    created_at:new Date()
},

];
Chat.insertMany(allchat);
  