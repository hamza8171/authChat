const path =require("path");
let multer=require("../../utilities/multer");
var fs=require("fs");
const {sendSMS}=require("./../../utilities/smsService");
const {sendEmail}=require('../../utilities/mailer');
const { default: mongoose } = require("mongoose");
const BadRequestResponse = require("express-http-response/lib/http/BadRequestResponse");
const OkResponse = require("express-http-response/lib/http/OkResponse");
const User=mongoose.model("User");
//const storage=require("multer").memoryStorage();

  //  const cpUpload=multer.fields([{name:'file',maxCount:1}])
let router=require("express").Router();

var cpUpload = multer.fields([{ name: "file", maxCount: 2 }]);

//params
router.param('id',(req,res,next,id)=>{
console.log(id);
next();

})



router.post('/',cpUpload,(req,res,next)=>{
    console.log(req.files)
res.json({url:`uploads/${req.files["file"][0].filename}`})
    
});

router.post("/delete", function (req, res, next) {
    console.log(req.body)
	if (req.body.url) {
		fs.unlink(path.join(process.cwd(), "server/public", req.body.url), function (err) {
			if (err) {
				return res.sendStatus(204);
			}
			// if no error, file has been deleted successfully
			return res.json({ status: 200, event: "File deleted Successfully" });
		});
	} else {
		if (!event) return res.sendStatus(204);
	}
	// unlink the files
});
		// get one user from DB
		router.get('/one/:id',(req,res)=>{
		



		})


router.post("/sendSMS",(req,res,next)=>{
const body=req.body;
console.log("body",body);
sendSMS(body);
return next();



});

router.post('/sendEmail',(req,res,next)=>{
		User.find({}).then((res)=>{
			if(!res) return next(new BadRequestResponse("user not found"));
			else{
				//console.log(res[0]);
				const user=res[0];
				const body =req.body.body;
				sendEmail(user,body,"contactUs");
				return next(new OkResponse(res));
			}
	
		})
	


});




module.exports=router;