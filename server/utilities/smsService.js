const accountSid = "AC9a07cb813920c6b17e6e2fd77161760c";
const authToken = "de0129ef3b24b91948358a7b10c88f5f";
const client = require("twilio")(accountSid, authToken);

const sendSMS = (body) => {
    console.log("twilio",body.body.message);
  client.messages
    .create({
      body: body.body.message,
      from: "+14092634172",
      to: body.body.to,
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));

  //   try {
  //     client.messages
  //       .create({
  //         body: body.message,
  //         from: "+61485868295",
  //         to: body.to,
  //       })
  //       .then((message) => console.log("message", message.sid))
  //       .catch((err) => console.log("errors", err));
  //   } catch (err) {
  //     console.log("errors", err);
  //   }
};

module.exports = { sendSMS };
