const mongoose = require('mongoose')
const schema = mongoose.Schema

const Userschema = new schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    hackerrank_profile:{
        type: String
    },
    hackerearth_profile:{
        type: String
    },
    codechef_profile:{
        type: String
    },
    codeforces_profile:{
        type: String
    },
    leetcode_profile:{
        type: String
    },
    interviewbit_profile:{
        type: String
    },
    spoj_profile:{
        type: String
    },
    hackerrank_solved:{
        type: Number
    },
    hackerearth_solved:{
        type: Number
    },
    codechef_solved:{
        type: Number
    },
    codeforces_solved:{
        type: Number
    },
    leetcode_solved:{
        type: Number
    },
    interviewbit_solved:{
        type: Number
    },
    spoj_solved:{
        type: Number
    }
    

}, {timestamps: true})
const User = mongoose.model('User',Userschema)
module.exports = User