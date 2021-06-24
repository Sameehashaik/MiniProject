const express = require('express');
const { render, name } = require('ejs');
const dbConnection = require('./lib/dbConnection')
const user = require('./Schema/user')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)
const cf=require('./Scrapers/codeforces');
const cc=require('./Scrapers/codechef');
const he=require('./Scrapers/hackerearth');
const ib=require('./Scrapers/interviewbt');
let userLib=require('./lib/userlib');
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine','ejs')

dbConnection.connect()

const PORT = process.env.PORT || 3000;

var store = new MongoDBStore({
   uri: 'mongodb+srv://tenor06:Abhishyant22102004@cluster0.mw1u9.mongodb.net/CRUD?retryWrites=true&w=majority',
   collection: 'Sessions'
 });

// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})

app.get("/", function(req, res){
   res.sendFile(__dirname+'/frontend/HTML/home.html')
})
app.get("/login", function(req, res){
    res.render('login');
    //console.log("Login page called");
    //res.sendFile(__dirname+'/frontend/HTML/login.html')
 })
 app.get("/register", function(req, res){
    res.render('register')
 })

 app.post('/register',async function(req, res){
    var data= req.body;
    var ccsolved=0;
    var cfsolved=0;
    var lcsolved=0;
    var spojsolved=0;
    var hrsolved=0;
    var hesolved=0;
    var ibsolved=0;
    var ccurl=data.codechef_profile;
    var cfurl=data.codeforces_profile;
    var heurl=data.hackerearth_profile;
    const iburl=data.interviewbit_profile;
    await cc.getCodechef(ccurl,function(result){
      console.log(result.solved);
      ccsolved=result.solved;
    })
    await cf.getCodeforces(cfurl,function(result){
      console.log(result.count);
      cfsolved=result.count;
    })
    await he.getHackerearth(heurl,function(result){
      console.log(result.count);
      hesolved=result.count;
    })
    await ib.getInterviewBit(iburl,function(result){
      console.log('ibres',result);
      ibsolved=result.score;
    })
   console.log(data);
   console.log(cfsolved);
   console.log(ccsolved);
   const usr= new user({
      username: data.username,
      email: data.email,
      password: data.password,
      hackerrank_profile: data.hackerrank_profile,
      hackerearth_profile: data.hackerearth_profile,
      codechef_profile: data.codechef_profile,
      codeforces_profile: data.codeforces_profile,
      interviewbit_profile: data.interviewbit_profile,
      spoj_profile: data.spoj_profile,
      hackerrank_solved: hrsolved,
      hackerearth_solved: hesolved,
      codechef_solved: ccsolved,
      codeforces_solved: cfsolved,
      interviewbit_solved: ibsolved,
      spoj_solved: spojsolved
  })
  await usr.save();
  res.redirect('/login');
})

app.post('/login',  function(req, res){
       var data = req.body
       console.log(data);
       //console.log(usr);
       userLib.isUserValid(data,function(resultJson){
         console.log(resultJson);
         if(resultJson.success==true){
            console.log("I got in ");
            res.redirect('/dashboard');
         }
         else
         {
           console.log("O00opsie");
           res.redirect('/login');
         }
       });
      //  }
      //  if(usr.username === data.username && usr.password === data.password){
      //      console.log("yeeeeee");
      //      res.redirect('/dashboard');
      //    //  if(user){
      //    //      req.session.userId = user._id
      //    //      console.log(req.session.userId)
      //    //  }
      //  }
      //  else{
      //      console.log("oopsie");
      //      res.redirect('/login')
      //  }
})

app.get('/dashboard',(req,res)=>{
    res.sendFile(__dirname+'/frontend/HTML/dashboard.html');
})
// app.get("/home", function(req, res){
//     const cc=require('./Scrapers/codechef')
// var url ='https://www.codechef.com/users/deepaknad'
//  cc.getCodechef(url,function(result){
//     codechef = result.solved
//     console.log(codechef);
//  })

//  const cf=require('./Scrapers/codeforces')
// var url ='https://codeforces.com/profile/sidreds06'
// cf.getCodeforces(url,function(result){
//     console.log('result',result)
//     codeforces = result.count
//     res.render('home',{codechef,codeforces})  
// })
 
// })

// const cc=require('/codechef.js');
// const heurl ='https://www.hackerearth.com/@saideepak6';
// he.getHackerearth(heurl,function(result){
//     console.log('result',result);
// });
