let passport=require("passport");
let LocalStrategy=require("passport-local").Strategy;
let mongoose=require("mongoose");
let User=mongoose.model("User");
let GoogleStrategy=require("passport-google-oauth20").Strategy;
const {Google_Client_ID,Google_Client_secret,backend}=require('.././config')

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		function (username, password, done) {
			User.findOne({
				email: { $regex: new RegExp("^" + username + "$", "i") },
			})
				.then(function (user) {
				
					if (!user || !user.validPassword(password))
						return done(null, false, { error: "Username or password is invalid!!" });

					return done(null, user);
				})
				.catch(done);
		}
	)
);

  
//passport.use()
passport.use(
new GoogleStrategy({
clientID:Google_Client_ID,
clientSecret:Google_Client_secret,
callbackURL:backend+'/api/externalAuth/google/callback',
passReqToCallback:false



} ,function(accessToken,refreshToken,profile,done){
	//console.log('profile', JSON.stringify(profile));
	//console.log('profileid',profile.id );
	done(null,profile);


}


))


