let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let crypto = require("crypto");
let jwt = require("jsonwebtoken");
let secret = require("../config").secret;
const mongoosePaginate = require("mongoose-paginate-v2");

const backend = require("../config").backend;
const publicPics = require("../config").publicPics;
let UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: "",
		},

		email: {
			type: String,
			unique: true,
			required: true,
		},

		userAddress: {
			type: String,
			default: "",
		},

		accountId: {
			type: String,
			default: "",
		},

		hasBankAcc: {
			type: Boolean,
			default: false,
		},

		profileImage: {
			type: String,
			default: `${publicPics}/noImage.png`,
		},

		bio: {
			type: String,
			default: "",
		},

		loginType: {
			type: String,
			default: null,
		},

		socialLinks: [
			{
				name: { type: String },
				link: { type: String },
			},
		],

		role: {
			type: String,
			enum: ["admin", "artist", "user"],
			default: "user",
		},

		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "inactive",
		},

		isEmailVerified: {
			type: Boolean,
			default: false,
		},

		googleId: String,
		facebookId: String,

		otp: { type: String, default: null },
		otpExpires: { type: Date, default: null },

		hash: { type: String, default: null },
		salt: String,

		resetPasswordToken: { type: String, default: null },
		mailToken: { type: String, default: null },
	},
	{ timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "Taken" });
UserSchema.plugin(mongoosePaginate);

UserSchema.methods.validPassword = function (password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
	return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generatePasswordRestToken = function () {
	this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
};

UserSchema.methods.generateMailToken = function () {
	this.mailToken = crypto.randomBytes(10).toString("hex");
};

UserSchema.methods.generateJWT = function () {
	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			email: this.email,
			exp: parseInt(exp.getTime() / 1000),
		},
		secret
	);
};

const autoPopulate = function (next) {
	next();
};

UserSchema.pre("findOne", autoPopulate);
UserSchema.pre("find", autoPopulate);

UserSchema.methods.toAuthJSON = function () {
	return {
		_id: this._id,
		name: this.name,
		email: this.email,
		profileImage: this.profileImage,
		socialLinks: this.socialLinks,
		googleId: this.googleId,
		facebookId: this.facebookId,
		token: this.generateJWT(),
		role: this.role,
		status: this.status,
		isEmailVerified: this.isEmailVerified,
		loginType: this.loginType,
		bio: this.bio,
		userAddress: this.userAddress,
		accountId: this.accountId,
		hasBankAcc: this.hasBankAcc,
	};
};

UserSchema.methods.toJSON = function () {
	return {
		_id: this._id,
		name: this.name,
		email: this.email,
		profileImage: this.profileImage,
		socialLinks: this.socialLinks,
		googleId: this.googleId,
		facebookId: this.facebookId,
		role: this.role,
		status: this.status,
		isEmailVerified: this.isEmailVerified,
		loginType: this.loginType,
		bio: this.bio,
		userAddress: this.userAddress,
		accountId: this.accountId,
		hasBankAcc: this.hasBankAcc,
	};
};

module.exports = mongoose.model("User", UserSchema);
