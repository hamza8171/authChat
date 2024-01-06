let express = require("express");
const mongoose = require("mongoose");
const { allowedOrigins, PORT } = require("./server/config");
const morgan = require("morgan");

require("dotenv").config();

// Create global app object
let app = express();
app.use(morgan('tiny'));
require("./server/app-config")(app);

// finally, let's start our server...
let server = app.listen(process.env.PORT || PORT, function () {
	console.log("Listening on port " + server.address().port);
});



process.once("SIGUSR2", function () {
	server.close(() => {
		console.log("Http server closed.");
		// boolean means [force], see in mongoose doc
		mongoose.connection.close(false, () => {
			console.log("MongoDb connection closed.");
			process.kill(process.pid, "SIGUSR2");
			process.exit(0);
		});
	});
});

process.on("SIGINT", function () {
	// this is only called on ctrl+c, not restart
	server.close(() => {
		console.log("Http server closed.");
		// boolean means [force], see in mongoose doc
		mongoose.connection.close(false, () => {
			console.log("MongoDb connection closed.");
			process.kill(process.pid, "SIGINT");

			process.exit(0);
		});
	});
});
