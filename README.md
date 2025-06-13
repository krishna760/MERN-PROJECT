## Project Disclaimer

This project is developed **strictly for educational purposes only**.  
It is not intended for commercial use or production deployment.    
All technologies, and libraries used are for learning and demonstration.  

## Overview of project  
This is a simple website designed to raise awareness and provide live updates about COVID-19.  
It shows current statistics such as active cases, recoveries, and preventive tips, along with general information about the virus and its symptoms.  
The website is built using Mongoose, Node.js, Express, React, and the Handlebars template engine and mongodb as database.  

## Step to setup project after cloning  
To install npm, simply install Node.js:    
Go to the official download page: https://nodejs.org and this will download both:  
Node.js  
npm  

Download and install MongoDB Community Server:  
https://www.mongodb.com/try/download/community  
Start the MongoDB server (it usually runs automatically after install)  
add C:\Program Files\MongoDB\Server\8.0\bin to environment path  
run run mongod --version to make sure its up and running  

And it will listening at:  
mongodb://localhost:27017/registrationform  
NOW,  
git clone https://github.com/krishna760/MERN-PROJECT.git  
cd MERN-PROJECT  
make .env file with content "SECRET_KEY=yoursecretkey"  
npm install  
npm install nodemon  
npm run dev  #starts development version of server same like as "nodemon src/app.js -e js,hbs"  
Navigate to http://localhost:3000 and register yourself and data will store in mongodb compass in registrationform section  

Download MongoDB Compass from:  
https://www.mongodb.com/try/download/compass  
Connect to the same URI i.e mongodb://localhost:27017/ to visualize the database.  
