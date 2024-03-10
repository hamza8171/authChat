let nodemailer=require("nodemailer");
let smtp=require('../config').smtpAuth;
let {emailVerifyTemplate,contactUsTemplate,forgotPasswordTemplate}=require('./emailTemplate')

const setTransporter=()=>{
        return nodemailer.createTransport({
                
                host:"smtp.gmail.com",
                secure: true,
                port: 465,
                debug: true,
                auth: smtp,





        });
}


const selectTemplate=(user,body,template)=>{
if(body.verifyEmail){template=emailVerifyTemplate(user)}
else if(body.contactUs){template=contactUsTemplate(user)}
else if(body.forgotPassword){template=forgotPasswordTemplate(user)}
else {console.log("body not found",body)}
return template;

}

const sendEmail=(user,subject,body)=>{

console.log(user,subject,body);

const transpoter=setTransporter();

let template=""
     template=selectTemplate(user,body,template);

const message={
to:user.email,
from:"speakr@speakr.fr",
subject,
html:template



}

transpoter.sendMail(message,(err,info)=>{
        if(err){
             console.log(err)
        }else{

                console.log("email info",info)
        }
}


)





}


module.exports={sendEmail};