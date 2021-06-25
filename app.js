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
const lc =  require('./Scrapers/leetcode');
const sp = require('./Scrapers/spoj')
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

 var store = new MongoDBStore({
  uri: 'mongodb+srv://tenor06:Abhishyant22102004@cluster0.mw1u9.mongodb.net/stopstalk?retryWrites=true&w=majority',
  collection: 'mySessions'
});


 app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: 'stopstalk123',
   cookie: {
       maxAge: 1000*60*60,
       sameSite: true,
       secure: false
   },
   store: store
}))

var isAuth=(req,res,next)=>{
  if(req.session.user)
    next()
  else
    res.redirect('/login')  
}

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
   
    var ccurl = `https://www.codechef.com/users/${data.codechef_profile}`
    var cfurl = `https://codeforces.com/profile/${data.codeforces_profile}`
    var heurl =  `https://www.hackerearth.com/users/pagelets/${data.hackerearth_profile}/hackerearth-profile-overview/`
    var iburl = `https://www.interviewbit.com/profile/${data.interviewbit_profile}`
    var lcurl = `https://competitive-coding-api.herokuapp.com/api/leetcode/${data.leetcode_profile}`
    var spurl = `https://www.spoj.com/users/${data.spoj_profile}/`

   const usr= new user({
      username: data.username,
      email: data.email,
      password: data.password,
      hackerrank_profile: data.hackerrank_profile,
      hackerearth_profile: heurl,
      codechef_profile: ccurl,
      codeforces_profile: cfurl,
      leetcode_profile: lcurl,
      interviewbit_profile: iburl,
      spoj_profile: data.spoj_profile,
      hackerrank_solved: hrsolved,
      hackerearth_solved: hesolved,
      codechef_solved: ccsolved,
      codeforces_solved: cfsolved,
      leetcode_solved: lcsolved,
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
       userLib.isUserValid(data, async function(resultJson){
         console.log(resultJson);
         if(resultJson.success==true){
            req.session.user = data.username 

            var ccsolved=0;
            var cfsolved=0;
            var lcsolved=0;
            var spojsolved=0;
            var hrsolved=0;
            var hesolved=0;
            var ibsolved=0;        
            var stat = resultJson.stats
            var ccurl=stat.codechef_profile;
            var cfurl=stat.codeforces_profile;
            var heurl=stat.hackerearth_profile;
            var lcurl = stat.leetcode_profile;
            var spurl = stat.spoj_profile;
            console.log(lcurl);
            const iburl=stat.interviewbit_profile;
            await cc.getCodechef(ccurl,function(result){
              console.log(result.solved);
              ccsolved=result.solved;
            })
            await cf.getCodeforces(cfurl,function(result){
              console.log(result.count);
              cfsolved=result.count;
            })
            await he.getHackerearth(heurl,function(result){
              console.log("HE Solved:"+result.count);
              hesolved=result.count;
            })
            await lc.getleetcode(lcurl,function(result){
              console.log('lcres',result);
              lcsolved=result.count;
            })
            await sp.getspoj(spurl,function(result){
              console.log('spres',result);
              spojsolved=result.score;
            })
            await ib.getInterviewBit(iburl,function(result){
              console.log('ibres',result);
              ibsolved=result.score;
            })

            var myquery = { username: data.username };
  var newvalues = { $set: {hackerearth_solved: hesolved, codechef_solved: ccsolved, codeforces_solved: cfsolved, leetcode_solved: lcsolved, interviewbit_solved: ibsolved, hackerrank_solved: hrsolved, spoj_solved: spojsolved } };
  user.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

           console.log(stat);
           console.log(cfsolved);
           console.log(ccsolved);


            res.redirect('/dashboard');
         }
         else
         {
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

app.get('/dashboard',isAuth,(req,res)=> {
   var usr = req.session.user
   var a=[]
   user.find({username: usr},async function(err, data){
    await  a.push(data[0].codechef_solved)
    await  a.push(data[0].codeforces_solved)
    await  a.push(data[0].interviewbit_solved)
    await  a.push(data[0].leetcode_solved)
    await a.push(data[0].hackerrank_solved)
    await  a.push(data[0].hackerearth_solved)
    await  a.push(data[0].spoj_solved)
    

    

    

     

     
     console.log(a);
     res.render('dashboard',{a})
   })
  
    
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

app.get('/logout', function(req, res){
  req.session.destroy((err)=>{
      if(err) throw err;
      res.redirect('/')
  
  })
})  
