let express=require("express");
const locale = require("express-locale");
let router=require("express").Router();
 bodyparser=require("body-parser"),
 passport=require("passport"),
 session=require("express-session");
 path =require("path"),
 createLocaleMiddleware=require("express-locale"),
 https=require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
let isProduction = process.env.NODE_ENV === 'production';
let mongodbClient=require("mongodb").MongoClient
let secret=require('./config').secret;
let startPolyglot=require("./utilities/startPolyglot");

 module.exports= (app)=>{

app.use(morgan('tiny'))

//app.use(require(morgan('tiny')));

app.use(bodyparser.urlencoded({extended:false,limit:'500mb'}));
app.use(bodyparser.json({ strict: false }));

//create locale otherwise set default
app.use(createLocaleMiddleware(
  {
    "priority": ["accept-language", "default"],
    "default": "en_GB"
  }
));
app.use(startPolyglot);

//imoprt routes
app.use(require('./routes'));
require("./utilities/passport");
app.use(passport.initialize());
app.use(session({ secret: secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.session());

  app.use(express.static(path.join(__dirname,'./public')));
  //app.use(session({ secret: secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
  if(!isProduction){

    //app.use(errorhandler());
  }
   
        

  mongoose.connect('mongodb://127.0.0.1:27017/testb').then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

  
    require('./models/User')
    require('./models/Order'); 
    require('./models/Nft');

};

      

      

  







 








