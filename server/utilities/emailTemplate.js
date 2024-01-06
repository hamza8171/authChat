const backend = require("../config").backend;
const publicPics = require("../config").publicPics;

const emailVerifyTemplate = (user) => {
	return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>

            <body>
                <div
                    style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;height: 766px;padding: 24px; margin: 0 auto;">
                    <div style="width: 150px; height: 60px; margin: 0 auto;">
                        <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
                    </div>
                    <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                        <h1
                            style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                            Welcome to Speaker
                        </h1>

                        <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">To verify your email
                            address, click the button below:</p>
                        <div style="text-align:center ; margin-top: 50px;">
                            <a href="${user.link}"
                                style="    background-color: #605BFF;border-radius: 16px;text-decoration: none;padding: 14px 30px;color: #fff;  ">
                                Confirm registration
                            </a>
                        </div>
                        <p
                            style="margin-bottom: 0; margin-top: 40px; text-align: center; font-style: normal;font-weight: 400;font-size: 16px; color: #313D5B;">
                            If the button does not work, follow the link below:
                        </p>
                        <div style="text-align: center; margin-top: 5px;">
                            <a href="${user.link}"
                                style="text-decoration: none;font-style: normal;font-weight: 400;font-size: 16px;">${backend}/confirmation-${user.mailToken}</a>
                        </div>
                    </div>
                </div>
            </body>

            </html>`;
};

const forgotPasswordTemplate = (user) => {
	return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>

            <body>
               <div style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;height: 500px;padding: 24px; margin: 0 auto;">
                    <div style="width: 150px; height: 60px; margin: 0 auto; margin-bottom: 25px;">
                       <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain; background-color: #6e1199; padding: 5px;">
                    </div>
                    <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                        <h1 style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">Password reset</h1>
                        <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B; width:80%; margin: 30px auto;">You recently requested to reset your password for your Speakr account.</p>
                        <div style="text-align:center ; margin-top: 30px;">
                            <a href="${user.link}"
                                style="background-color:#605BFF; border-radius: 16px;text-decoration: none;padding: 14px 30px;color: #fff;  ">
                                Reset your password
                            </a>
                        </div>
                        <p
                            style="margin-bottom: 0; margin-top: 40px; text-align: center; font-style: normal;font-weight: 400;font-size: 16px; color: #313D5B;">
                            If you did not request to reset your password, please ignore this mail. This password reset request is only valid for the next 30 minutes.
                        </p>
                    </div>
                    <p
                        style="text-align: center; font-style: normal;font-weight: 400;color: #626F93;font-size: 13px; margin-top: 30px;">
                        1225 Franklin Avenue, Suite 325 Garden City, NY 11530
                    </p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="#"
                            style="text-decoration: none; margin-right: 30px;font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #605BFF;">View
                            in browser</a>
                        <a href="#"
                            style="text-decoration: none;font-weight: 400;font-size: 13px;letter-spacing: 0.02em;color: #605BFF;">Unsubscribe</a>
                    </div>
                </div>
            </body>

            </html>`;
};

const emailNotVerifiedMail = (user) => {
	return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>

            <body>
               <div style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;height: 766px;padding: 24px; margin: 0 auto;">
                    <div style="width: 150px; height: 60px; margin: 0 auto;">
                        <img src="${backend}/uploads/emailPcs/newLogo.png" alt=""
                                style="width:100%; height:100%; object-fit:contain;">
                    </div>
                    <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                        <h1
                            style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                            Hi ${user.firstName} ${user.lastName},
                        </h1>

                        <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B; ">
                            You have been blocked from accessing your account
                        </p>
                        <div style="background-color:white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; border-radius: 32px;width: 208px;height: 208px;margin:40px auto 0 auto; padding:30px;">
                        <img src="${backend}/uploads/emailPcs/blockIcon.png" alt=""
                                style="margin:35px 40px;">
                        </div>
                        <p style="text-align:justify; font-weight: 400;font-size: 16px; color: #313D5B;">For numerous violations were your account was blocked by the administrator of site.com If you disagree withthe administrator's decision, please contact us help@busimess.ai</p>
                    </div>
                    <p
                        style="text-align: center; font-style: normal;font-weight: 400;color: #626F93;font-size: 13px; margin-top: 30px;">
                        1225 Franklin Avenue, Suite 325 Garden City, NY 11530
                    </p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="#"
                            style="text-decoration: none; margin-right: 30px;font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #605BFF;">View
                            in browser</a>
                        <a href="#"
                            style="text-decoration: none;font-weight: 400;font-size: 13px;letter-spacing: 0.02em;color: #605BFF;">Unsubscribe</a>
                    </div>
                     <div style="text-align: center; margin-top: 20px;">
                        <div style="margin-right: 20px; display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/instagram.png" alt=""></div>
            <div style="margin-right: 20px; display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/twitter.png" alt=""></div>
            <div style="display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/facebook.png" alt=""></div>
                    </div>
                </div>
            </body>

            </html>`;
};

const accountBlockMail = (user) => {
	return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>

            <body>
               <div style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;height: 766px;padding: 24px; margin: 0 auto;">
                    <div style="width: 150px; height: 60px; margin: 0 auto;">
                        <img src="${backend}/uploads/emailPcs/newLogo.png" alt=""
                                style="width:100%; height:100%; object-fit:contain;">
                    </div>
                    <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                        <h1
                            style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                            Hi ${user.firstName} ${user.lastName},
                        </h1>

                        <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B; ">
                            You have been blocked from accessing your account
                        </p>
                        <div style="background-color:white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; border-radius: 32px;width: 208px;height: 208px;margin:40px auto 0 auto; padding:30px;">
                        <img src="${backend}/uploads/emailPcs/blockIcon.png" alt=""
                                style="margin:35px 40px;">
                        </div>
                        <p style="text-align:justify; font-weight: 400;font-size: 16px; color: #313D5B;">For numerous violations were your account was blocked by the administrator of site.com If you disagree withthe administrator's decision, please contact us help@busimess.ai</p>
                    </div>
                    <p
                        style="text-align: center; font-style: normal;font-weight: 400;color: #626F93;font-size: 13px; margin-top: 30px;">
                        1225 Franklin Avenue, Suite 325 Garden City, NY 11530
                    </p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="#"
                            style="text-decoration: none; margin-right: 30px;font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #605BFF;">View
                            in browser</a>
                        <a href="#"
                            style="text-decoration: none;font-weight: 400;font-size: 13px;letter-spacing: 0.02em;color: #605BFF;">Unsubscribe</a>
                    </div>
                     <div style="text-align: center; margin-top: 20px;">
                        <div style="margin-right: 20px; display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/instagram.png" alt=""></div>
            <div style="margin-right: 20px; display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/twitter.png" alt=""></div>
            <div style="display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/facebook.png" alt=""></div>
                    </div>
                </div>
            </body>

            </html>`;
};

const addUserMail = (user) => {
	return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>

            <body>
              <div style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;height: 766px;padding: 24px; margin: 0 auto;">
                    <div style="width: 150px; height: 60px; margin: 0 auto;">
                        <img src="${backend}/uploads/emailPcs/newLogo.png" alt=""
                                style="width:100%; height:100%; object-fit:contain;">
                    </div>
                    <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 90px;">
                        <h1
                            style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                            You've got an invitation to sign up in CleanOn company as a ${user.roleText}
                        </h1>
                        <div
                            style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin:auto;">
                                <img src="${backend}/uploads/emailPcs/Icons-bid.png" style="margin:63px;" alt="" >
                        </div>
                        <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">Press the ”Create an account” button, set your password and start working now!</p>
                        <div style="text-align:center ; margin-top: 50px;">
                            <a href="${user.link}"
                                style="background-color: #605BFF;border-radius: 16px;text-decoration: none;padding: 14px 30px;color: #fff;  ">
                                Create an account
                            </a>
                        </div>
                        <p
                            style="margin-bottom: 0; margin-top: 40px; text-align: center; font-style: normal;font-weight: 400;font-size: 16px; color: #313D5B;">
                            If you did not request this email, please ignore this mail.
                        </p>
                    </div>
                    <p
                        style="text-align: center; font-style: normal;font-weight: 400;color: #626F93;font-size: 13px; margin-top: 30px;">
                        1225 Franklin Avenue, Suite 325 Garden City, NY 11530
                    </p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="#"
                            style="text-decoration: none; margin-right: 30px;font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #605BFF;">View
                            in browser</a>
                        <a href="#"
                            style="text-decoration: none;font-weight: 400;font-size: 13px;letter-spacing: 0.02em;color: #605BFF;">Unsubscribe</a>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <div style="margin-right: 20px; display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/instagram.png" alt=""></div>
            <div style="margin-right: 20px; display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/twitter.png" alt=""></div>
            <div style="display: inline-block; width:25px; height:25px"><img
                    style="width: 100%; height:100%; object-fit:cover"
                    src="${backend}/uploads/emailPcs/facebook.png" alt=""></div>
                    </div>
                </div>
            </body>

            </html>`;
};

const contactUsTemplate = (user) => {
	return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>

            <body style="background: #fff;  width: 100%;  padding: 0 80px; margin: 0 auto; margin-top: 30px;  ">
                <div style="width: 100%;">
                    <div style="width: 150px; height: 60px; margin: 0 auto; margin-bottom: 25px;">
                       <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain; background-color: #6e1199; padding: 5px;">
                    </div>
                    <div style="font-size: large;">
                        <div>
                            <h3>
                                Sender Name
                            </h3>
                            <p style="margin-left:10px">
                                ${user.name}
                            </p>
                        </div>
                        <div>
                            <h3>
                                Email
                            </h3>
                            <p style="margin-left:10px">
                                ${user.email}
                            </p>
                        </div>
                        <div>
                            <h3>
                                Phone
                            </h3>
                            <p style="margin-left:10px">
                                ${user.phone}
                            </p>
                        </div>
                        <div>
                            <h3>
                                Artist/Label
                            </h3>
                            <p style="margin-left:10px">
                                ${user.role}
                            </p>
                        </div>
                        <div>
                            <h3>
                                Indie/Signed
                            </h3>
                            <p style="margin-left:10px">
                                ${user.type}
                            </p>
                        </div>
                        <div>
                            <h3>
                                Message
                            </h3>
                            <p style="margin-left:10px">
                                ${user.message}
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            <div style="margin-top: 40px; text-align: center; font-weight: 400; font-size: 16px; color: #C4C4C4;">
                Connect with Speakr
            </div>
            <div style="text-align: center; display: flex; width:100%; max-width:90px; margin: 40px auto; margin-top: 30px; ">
                <div style="margin-right:20px">
                    <a href="https://www.instagram.com/speakr_/" target="_blank">
                        <img src="${publicPics}/instagram.png" alt="">
                    </a>
                </div>
                <div>
                    <a href="https://twitter.com/Speakrapp" target="_blank">
                        <img src="${publicPics}/twitter.png" alt="">
                    </a>
                </div>
                <div>
                    <a href="https://www.tiktok.com/@speakr_" target="_blank">
                        <img src="${publicPics}/tiktok.png" alt="">
                    </a>
                </div>
            </div>

            <div style="font-weight: 400; font-size: 16px; color: #C4C4C4; text-align: center;">
                © Speakr 2023
            </div>
        </html>`;
};

module.exports = {
	emailVerifyTemplate,
	forgotPasswordTemplate,
	contactUsTemplate,
};
