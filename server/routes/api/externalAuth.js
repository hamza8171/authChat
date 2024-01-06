let router = require("express").Router();
let passport = require("passport");
let mongoose=require("mongoose");
let { OkResponse, BadRequestResponse, UnauthorizedResponse, ConflictResponse } = require("express-http-response");

let User = mongoose.model("User");
let backend = require("../../config").backend;

const htmlPage =
	'<html><head><title>Main</title></head><body></body><script defer >res = %value%</script></html>';

router.get(
	"/google",
	(req, res, next) => {
		req.session = req.query;
		next();},
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
		failureRedirect: backend + "/api/externalAuth/failed",
	}),
	function (req, res, next) {
		
		console.log("session= ",req.session);

		User.findOne({ $or: [{ googleId: req.user.id }, { email: req.user.emails[0].value }] })
		.then((user)=>{
					if(!user){

						return next(new BadRequestResponse("no such user"));
					}else{
						let responseHTML = htmlPage.replace("%value%", JSON.stringify({ user: user.toAuthJSON() }));
				//return res.status(200).send(responseHTML);

				
					
					user.googleId=req.user.id;
					user.isEmailVerified= true;
					
		
		
				 

				  user.profileImage = req.user.photos[0].value;
				  user.status = "active";
				  user.loginType="Google";
				  user.name=req.user.displayName;
				  user.save().then((response)=>{
					res.send(`<h1>${response}</h1>`)




				  }).catch((err)=>{
					console.log("user save error:",err)
				  })

					}
			})
	}
);

router.get(
	"/facebook",
	(req, res, next) => {
		req.session.lastQuery = req.query;
		next();
	},
	passport.authenticate("facebook")
);

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		session: false,
		failureRedirect: backend + "/api/externalAuth/failed",
	}),
	function (req, res, next) {
		const { lastQuery } = req.session;
		// console.log("lastQuery", lastQuery);
		// console.log("req.user", req.user);
		User.findOne({ facebookId: req.user.id }, async function (err, user) {
			if (err) return next(new BadRequestResponse(err));

			if (user) {
				let responseHTML = htmlPage.replace("%value%", JSON.stringify({ user: user.toAuthJSON() }));
				return res.status(200).send(responseHTML);
			}

			let newUser = new User({
				facebookId: req.user.id,
				isEmailVerified: true,
			});

			// let wallet = new Wallet();
			// await wallet.save();
			// user.wallet = wallet._id;

			// if (+lastQuery.role === 2) {
			// 	user.role = 2;
			// } else {
			// 	user.role = 3;
			// }

			newUser.loginType = "facebook";
			newUser.email = req.user.id + "@facebook.com";
			newUser.name = req.user.displayName;
			newUser.status = "active";
			newUser.profileImage = req.user.photos[0].value;

			newUser.save(function (err, user) {
				if (err) {
					let responseHTML = htmlPage.replace("%value%", JSON.stringify({ err: err }));
					return res.status(400).send(responseHTML);
				}

				let responseHTML = htmlPage.replace("%value%", JSON.stringify({ user: newUser.toAuthJSON() }));
				return res.status(200).send(responseHTML);
			});
		});
	}
);

router.post("/web3/login", function (req, res, next) {
	console.log(req.body, "frontend");
	User.findOne({ email: req.body.email }, async function (err, user) {
		if (err) return next(new BadRequestResponse(err));
		if (user) {
			if (user.loginType !== req.body.typeOfLogin)
				return next(new ConflictResponse("You've already an account associated with different login method"));
			return next(new OkResponse(user.toAuthJSON()));
		}

		let newUser = new User({
			email: req.body.email,
			isEmailVerified: true,
			name: req.body.email.split("@")[0],
			profileImage: req.body.profileImage,
			loginType: req.body.typeOfLogin,
			status: "active",
		});

		newUser.save((err, result) => {
			if (err) return next(new BadRequestResponse(err));
			return next(new OkResponse(result.toAuthJSON()));
		});
	});
});

router.get("failed", (req, res, next) => {
	return next(new BadRequestResponse("Login Failed"));
});

router.get('/',(req,res)=>{

	res.send('<button><a href="/google">authenticate with google</a></button>')
})

module.exports = router;
