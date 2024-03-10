"use strict";
module.exports = {
  backend: "http://localhost:8000",
  frontend: "http://91.107.238.5",
  publicPics: "http://91.107.238.5/uploads/publicPics",
 Google_Client_ID:"184615412448-1snlvjvrkkcr8kgl4eumli46m17oragc.apps.googleusercontent.com",
 Google_Client_secret:"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",
  // backend: "http://localhost:8000",
  // frontend: "http://localhost:3000",
  // publicPics: "http://http://localhost:8000/uploads/publicPics",
  PORT: 8000,
  MONGODB_URI: "mongodb://127.0.0.1:27017",
  secret: "secret",
  host: "",
 
  smtpAuth: {
    user: 'verify@smartup.dk',
    pass: 'Noraiz.123456'
  },
  allowedOrigins: ["http://localhost:3000", "http://localhost:8000", " http://localhost:5173", "http://91.107.238.5"],
};
