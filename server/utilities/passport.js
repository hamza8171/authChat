let passport=require("passport");
let LocalStrategy=require("passport-local").Strategy;
let mongoose=require("mongoose");
let User=mongoose.model("User");
let GoogleStrategy=require("passport-google-oauth20").Strategy;
let FacebookStrategy=require("passport-facebook").Strategy;
const {Google_Client_ID,Google_Client_secret,backend}=require('.././config');

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		function (email, password, done) {
			User.findOne({
				email: email,
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
passReqToCallback:false,
scope: ['profile', 'email'],



} ,function(accessToken,refreshToken,profile,done){
	console.log('profile', JSON.stringify(profile));
	//console.log('profileid',profile.id );
	done(null,profile);


}


))

//authenticate using facebook





