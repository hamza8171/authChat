const path =require("path");
let multer=require("../../utilities/multer");
var fs=require("fs");
//const storage=require("multer").memoryStorage();

  //  const cpUpload=multer.fields([{name:'file',maxCount:1}])
let router=require("express").Router();

var cpUpload = multer.fields([{ name: "file", maxCount: 2 }]);

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
			console.log(req.params);



		})







module.exports=router;