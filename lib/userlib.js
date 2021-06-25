  
const userModel  = require('../Schema/user');
const mongoose =require('mongoose');
module.exports.isUserValid = function(userJson, cb){
    // Select * from users where username="" and password=""
    // if req.body = {username:'username'}
    //var query = {username: userJson.username, password:userJson.password, isDeleted:false};

    var query = {username: userJson.username, password:userJson.password, isDeleted:{$ne : true}};

    userModel.find(query, function(err, collections){
        var response = {success: false, message: 'Login Failed', user: null, stats: {} };
        if(err){
            response.message = 'Server Side Error Occured, Try again after some time';
            return cb(response);
        }
        if(collections.length==0){
            response.message = 'Invalid username/password';
            return cb(response);
        }
        response.success = true;
        response.message = 'Login Successful';
        response.user = {username: collections[0].username,};
        response.stats = {hackerrank_profile: collections[0].hackerrank_profile ,
            hackerearth_profile: collections[0].hackerearth_profile,
            codechef_profile: collections[0].codechef_profile,
            codeforces_profile: collections[0].codeforces_profile,
            leetcode_profile: collections[0].leetcode_profile,
            interviewbit_profile: collections[0].interviewbit_profile,
            spoj_profile: collections[0].spoj_profile
        }
        cb(response);
    })
}