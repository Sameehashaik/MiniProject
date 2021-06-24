  
const userModel  = require('../Schema/user');
const mongoose =require('mongoose');
module.exports.isUserValid = function(userJson, cb){
    // Select * from users where username="" and password=""
    // if req.body = {username:'username'}
    //var query = {username: userJson.username, password:userJson.password, isDeleted:false};

    var query = {username: userJson.username, password:userJson.password, isDeleted:{$ne : true}};

    userModel.find(query, function(err, collections){
        var response = {success: false, message: 'Login Failed', user: null };
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
        cb(response);
    })
}