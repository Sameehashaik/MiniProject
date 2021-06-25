const mongoose = require('mongoose')

const connectionString="mongodb+srv://tenor06:Abhishyant22102004@cluster0.mw1u9.mongodb.net/stopstalk?retryWrites=true&w=majority"
module.exports={
    connect: function(){
        mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})
        .then((result)=> console.log("Database Connected"))
        .catch((err)=>console.log("ERROR!!"))
        mongoose.connection.on('connected',function(){
            console.log("DB Connected")
        })
    }
}