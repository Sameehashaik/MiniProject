const express = require('express');
const { render, name } = require('ejs');
const dbConnection = require('./lib/dbConnection')
const user = require('./Schema/user')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine','ejs')

dbConnection.connect()

const PORT = process.env.PORT || 5000;

var store = new MongoDBStore({
   uri: 'mongodb+srv://tenor06:Abhishyant22102004@cluster0.mw1u9.mongodb.net/CRUD?retryWrites=true&w=majority',
   collection: 'Sessions'
 });

// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})

app.get("/", function(req, res){
   res.render('home')
})
app.get("/login", function(req, res){
    res.render('login')
 })
 app.get("/register", function(req, res){
    res.render('register')
 })

 app.post('/register',async function(req, res){
   var data= req.body;
   const usr= new user({
      username: data.username,
      email: data.email,
      password: data.password,
      hackerrank_profile: data.hackerrank_profile,
      hackerearth_profile: data.hackerearth_profile,
      codechef_profile: data.codechef_profile,
      codeforces_profile: data.codeforces_profile,
      interviewbit_profile: data.interviewbit_profile,
      spoj_profile: data.spoj_profile
  })
  await usr.save()
  res.redirect('/login')
})
 
app.post('/login', async function(req, res){
   try{
       var data = req.body
       var usr = await user.findOne({username: data.username})
       if(usr.username === data.username && usr.password === data.password){
           res.render('home')

         //  if(user){
         //      req.session.userId = user._id
         //      console.log(req.session.userId)
         //  }
       }
       else{
           res.redirect('/login')
       }


   }
   catch{
       console.log("Error")
   }
})

var interviewbit = 0
var hackerath = 0
var leetcode = 0
var hackerrank = 0
var spoj = 0
var a = []
app.get("/home", function(req, res){
   var codechef = {}
var codeforces = {}
    const cc=require('./Scrapers/codechef')
var url ='https://www.codechef.com/users/deepaknad'
 cc.getCodechef(url,function(result){
    codechef = result.solved

 })

 const cf=require('./Scrapers/codeforces')
var url ='https://codeforces.com/profile/sidreds06'
cf.getCodeforces(url,function(result){
    console.log('result',result)
    codeforces = result.count
    res.render('home',{codechef,codeforces})  
})
 
})

// const cc=require('/codechef.js');
// const url ='https://www.codechef.com/users/deepaknad';
// cc.getCodechef(url,function(result){
//     console.log('result',result);
// });