const exp = require("express");
const app = exp();
const mongoose = require("mongoose");
const path = require("path");

app.use(exp.static(path.join(__dirname,"./dist/Store")));

app.use(exp.json());


const userApiObj = require("./API's/userApi");
const activityApiObj = require("./API's/activityApi");

app.use("/user",userApiObj);
app.use("/activity",activityApiObj);


const dburl = "mongodb+srv://todop:todop@cluster0.kopsp.mongodb.net/notes?retryWrites=true&w=majority";

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;

db.on("error",()=>console.log("err in db connection"));
db.once("open",()=>console.log("connected to db"));

app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`});
})

app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send({message:"error occured",reason:err.message});
})


const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Server started on port ${port}`))
