const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }]
})
//Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions
//Pre middleware functions are executed one after another, when each middleware calls next.
//post middleware are executed after the hooked method and all of its pre middleware have completed.
//pre simply means ******call it before another work*********for board exam we have to our registration for before giving exam
//post simply means after showing registration what should we have to do

employeeSchema.methods.generateAuthToken = async function(){//we dont use fat arrow function because we are playing with this keyword
   try{
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);//secret key should be kept on .env file
    this.tokens = this.tokens.concat({token:token})
   console.log(`this is json web token ${token}`)
return token;
   }catch(error){
       res.send(`the error part is ${error}`)
       console.log(`the error part is ${error}`)

}
}

//convert password into hash
 employeeSchema.pre("save", async function(next){
    //const bcrypt = require("bcrypt");
      //const passwordHash = await bcrypt.hash(password, 10);-
      try{
          if(this.isModified("password")){// only do if password modified
        //console.log(`current password is ${this.password}`)
        this.password = await bcryptjs.hash(this.password, 10);
      console.log(`current hashwed password is ${this.password}`)
      this.confirmpassword = await bcryptjs.hash(this.password, 10);// or undefined
     }else{
        console.log("Password are not matching")
     }
    }catch(err){
       console.log(err)
     }
      next();//important for futher do
    })
    
//create collection

const Register = new mongoose.model("Register", employeeSchema)
module.exports = Register;






/* employeeSchema.pre("save", async function(next) {
    const bcrypt = require("bcrypt");
    const securePassword = async (password)=>{
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash)
      const passwordmatch = await bcrypt.compare(securePassword, passwordHash);
      console.log(passwordmatch)
}
}) */