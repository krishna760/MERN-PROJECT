require("dotenv").config();
const path = require("path");
const bcryptjs = require("bcryptjs");
const express = require("express");
const app = express()
const hbs = require("hbs")
require("./db/conn")
var cookieParser = require('cookie-parser')


const Register = require("./models/registers")
const port = process.env.PORT || 3000
const static_path =  path.join(__dirname, "../public");
const template_path =  path.join(__dirname, "../templates/views");
const partials_path =  path.join(__dirname, "../templates/partials");

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))//for getting data written on form
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

console.log(`this is secret key ${process.env.SECRET_KEY}`)////for console secret key


app.get("/", (req, res)=>{
res.render("index")
})
//create a new user in our database
//for register
app.get("/register", (req, res)=>{
    res.render("register")
    })
    app.get("/getcookie", (req, res)=>{
        res.render("getcookie")
        })
    
    
    app.post("/register", async(req, res)=>{
        try{
            const password = req.body.password;
            const cpassword = req.body.confirmpassword;
            if(password === cpassword){
                //RegisterEmployee is the instance of Register collection
                //also when we work with instance we also use methods
                //statics are the methods defined on the model
                //methods are defined on the document(instance)
                //use .static for instance methods 
                //use .methods for instance methods 
               const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : password,
                confirmpassword : cpassword
               })


               //HASH PASSWORD before saving to database(so it is *****middleware****)work between
               //A middleware is basically a function that will the receive the Request and Response objects,
               const token = await registerEmployee.generateAuthToken(); 
               //*************** STORE JWT TOKENS IN HTTPOnly Cookies using node js ************************************************************************* */
               //SECURE JWT AUNTHENTICATION
               //the res.cookies function is used to set the cookie name to value
               //res.cookie()The value parameter may be a string or object converted to json
                    res.cookie("jwt", token, {
                        expires:new Date(Date.now() + 30000),
                        httpOnly:true
                    });
             
               const registered = await registerEmployee.save();
              res.status(201).render("index");
               console.log(registered)
            }else{
                res.send("Password are not matching")
            }

        }catch(error){
            res.status(400).send(error)
        }
        })
        //for login
        app.get("/login", (req, res)=>{
            res.render("login")
            })
        app.post("/login", async (req, res)=>{
            try{
               const email = req.body.email;
               const password = req.body.password;
            const useremail = await Register.findOne({email:email})
            console.log(`this is password of particular user in database ${useremail.password}`)
            //it show password of particular email address
            const passwordmatch = await bcryptjs.compare(password, useremail.password)
            const token = await useremail.generateAuthToken(); 
                    //   HttpOnly is a flag that can be included in a Set-Cookie response header.
        //   The presence of this flag will tell browser to not allow client side script access to the
        //   cookies..
            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 30000),
                httpOnly:true,
                //secure:true  //Only for https
            });
             
            if(passwordmatch){
          // if(useremail.password == password)
                 res.status(201).render("index");
             }else{
                 res.send("invalid login details")
             }
            }catch(error){
              res.sendStatus(400).send("invalid login details")
            }
        }) 

        
      
app.listen(port, ()=>{
    console.log(`listining to port ${port}`)
})
// JWT (pronounced as “jot”) is a way of transferring signed data between
//  two parties. The use case of JWT is seen in applications where authentication
//   and information exchange is present. JWT is JSON object that has been signed
//    using a secret key or a public/private key pair. It also can have an expire 
//    date after which the token is not valid to be used.

/*const jwt = require("jsonwebtoken")
        const createToken = async()=>{
           const token = await jwt.sign({_id:"6254da08470993ae31f32696"}, "jhefhegffbrefbrehfrferuferverfberjfrbfhejrhf", {
               expiresIn:"2 seconds"
           })
        console.log(token)
        const userVer = await jwt.verify(token, "jhefhegffbrefbrehfrferuferverfberjfrbfhejrhf")
        console.log(userVer)
        }
        createToken()*/