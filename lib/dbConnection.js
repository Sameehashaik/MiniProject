const mongoose = require('mongoose')

const connectionString="mongodb+srv://deepaknad:Deepak4D6@cluster0.vkpay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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