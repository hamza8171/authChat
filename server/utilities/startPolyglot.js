const startPolyglot=require("node-polyglot");

const {availaLangs,messages}=require("../i18n/i18n");

module.exports=polyglot=(req,res,next)=>{

    const locale=req.locale.language;
        console.log(locale);
        
req.polyglot=new startPolyglot();

if(locale=='ko'){

    req.polyglot.extend(messages.ko);
}
else{

    req.polyglot.extend(messages.en);
}
next();
}