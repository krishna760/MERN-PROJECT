const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/registrationform", {useNewUrlParser:true, UseUnifiedTopology:true})
.then(()=>{
    console.log("Connecton successful")
}).catch((e)=>{
    console.log("No Connection")
})
