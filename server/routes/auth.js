const OkResponse = require("express-http-response/lib/http/OkResponse");
let {expressjwt:jwt} = require("express-jwt");
let secret = require("../config").secret;
let mongoose = require("mongoose");

let User = require('./../models/User');
let UnauthorizedResponse = require("express-http-response").UnauthorizedResponse;

function getTokenFromHeader(req) {
				console.log(req.headers.authorization)
		
	if (
		(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token") ||
		(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
	) {
		return req.headers.authorization.split(" ")[1];
	}

	return null;
}

const user = (req, res, next) => {
    console.log('payload='+req.body.id)
	User.findById(req.body.id)
		.then(function (user) {
		
			if (!user) return next(new UnauthorizedResponse());
			// also add here bit of status
			req.user = user;
			//console.log(user);
			//res.send({user:user.toAuthJSON()})
			next();
		})
		.catch(next);
};

const admin = (req, res, next) => {
	User.findById(req.payload.id)
		.then(function (user) {
			if (!user) return next(new UnauthorizedResponse());
			if (user.role !== "admin") next(new UnauthorizedResponse());
			req.user = user;
			next();
		})
		.catch(next);
};

const auth = {
	required: jwt({
		secret: secret,
        algorithms: ["HS256"],
		userProperty: "payload",
		getToken: getTokenFromHeader,
	}),
	optional: jwt({
		secret: secret,
        algorithms: ["HS256"],
		userProperty: "payload",
		credentialsRequired: false,
		getToken: getTokenFromHeader,
	}),
	user,
	admin,
};

module.exports = auth;
