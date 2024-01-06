let mongoose=require("mongoose");
let router=require("express").Router();
let auth=require("../auth")
let User =mongoose.model("User");
let {sendEmail}=require('../../utilities/mailer')

let {OkResponse,UnauthorizedResponse,BadRequestResponse}=require("express-http-response");
let passport=require("passport");
const htmlPage =
	'<html><head><title>Main</title></head><body><script defer >res = %value%; window.opener.postMessage(res, "*");window.close();</script></body></html>';

router.param("email", (req, res, next, email) => {
    User.findOne({ email }, (err, user) => {
      if (err) return next(new BadRequestResponse(err));
      if (!user) return next(new BadRequestResponse("User not found!", 423));
      req.userToUpdate = user;
      return next();
    });
  });

//signup user


router.post("/signup", (req, res, next) => {
        
      User.findOne({email:req.body.email}).then((user)=>{
        if(user){

            next(new BadRequestResponse("username already exist"));

        }

        
            else{
              let user = new User({
                name:req.body.name,
                role:req.body.role,
                email:req.body.email,
                loginType:"username/password",
                status:req.body.status
              });
              user.setPassword(req.body.password);
              user.generateMailToken();
          
                user.save().then((user)=>{
                  if(user){
                   res.json({user:user.toAuthJSON()});
                  }
          
          
                }).catch((err)=>{
                 console.log("err"+err)
                })
                         }

                        }).catch((err)=>{
                            res.send(err)




                        })


      })


   

   //login route 

   router.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: true }, function (err, user, info) {
      if (err) return next(new BadRequestResponse(err.message));
      if (!user) return next(new BadRequestResponse(`Incorrect username/password or user does not exist.`, 423));
      if (user.status === "inactive") return next(new UnauthorizedResponse("Your account is inactive", 402));
      // if (user.role !== req.body.user.type) return next(new UnauthorizedResponse("Unauthorized", 402));
      console.log("session"+req.session)
      return res.json({user:user.toAuthJSON()});
    })(req, res, next);
  });
         


    router.post('/contact',(req,res,next)=>{
       // console.log("in route api",req.body)
        if(!req.body.email || !req.body.message ||!req.body.phone
          ){
              return next(new BadRequestResponse("parameter srecification missing"));

          }
          if(
            !req.body.email.includes("@") ||
		!req.body.email.includes(".") ||
		!req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
          ){
            return next(new BadRequestResponse("invalid email"));
          }
       



        sendEmail(req.body,"contact us",{contactUs:true});
              return new OkResponse("success");

      });
       

    



    module.exports=router