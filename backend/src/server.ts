import express from "express";
import cors from "cors";
import { phoneNumbers , users} from "./Data";
import jwt from "jsonwebtoken"
;
const app = express();

const mongoose = require('mongoose');

connectToDB().catch(err => console.log(err));

async function connectToDB() {
  await mongoose.connect('mongodb+srv://maisa:HHnG5wOAEDJadtmq@cluster0.hyduu.mongodb.net/phoneBook');
  
}
app.use (cors({
    //????
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.get("/api/numbers",(req,res) => {
    res.send(phoneNumbers)
})
// 1) username ის უნიკალურობა 2) password დაშიფრული 3) 
app.post('/user/registration',(req,res)=> {
   res.send('hu')
})

app.post('/user/login',(req,res)=> {
    const {username, password} = req.body 
    const user = users.find(user => user.username === username && user.password === password)

    if(user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(400).send("Username or password is not valid")
    }

})

const generateTokenResponse = (user:any) => {
 const token = jwt.sign({
    userName: user.userName
 },"anything",{
    expiresIn:'30d'
 })

 user.token = token;
 return user;
}

app.get('/phonebook/numbers',(req,res)=> {
    res.send('hu')
})

app.put('/phonebook/numbers',(req,res)=> {
    res.send('hu')
})

app.post('/phonebook/numbers',(req,res)=> {
    res.send('hu')
})

app.delete('/phonebook/numbers',(req,res)=> {
    res.send('hu')
})

const port = 5200;
app.listen(port,()=> {
    console.log("website served on http://localhost:" + port)
})