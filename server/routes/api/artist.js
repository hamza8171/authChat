let router=require("express").Router();
let {BadRequestResponse,OkResponse,UnauthorizedResponse,ConflictResponse}= require("express-http-response");
const { default: mongoose } = require("mongoose");
let auth=require('../auth');
let Artist=require('../../models/Artist');


router.post('/add',auth.user,(req,res,next)=>{
//console.log("in Arist",req.body);
if(!req.body){
    return next(new BadRequestResponse("missing body"));
}

const art= new Artist({
    slug:req.body.slug,
    userName:req.body.userName,
    nfts:req.user._id,
    socialLinks:[{
        name:req.body.name,
        value:req.body.value
    }]
})

art.save().then((resp)=>{
console.log("resp",resp.nfts[0]);
if(!resp) return next(new BadRequestResponse("Artist not save"));
if(resp) return next(new OkResponse({resp:resp.toJSON()}));
}).catch((err)=>{
    res.json({message:err.message});

})

})


router.post('/',(req,res,next)=>{
console.log(req.body)

})


router.get('/',(req,res,next)=>{

    let query={
        userName:("hamza bhinder" || "huraira")
    }
    let option={
        createdAt:-1
    }
    Artist.find(query).then((resp)=>{
        console.log("artist",resp[0].nfts);
        if(!resp ) return next(new BadRequestResponse("No artist found"));
        res.send(resp);

    }).catch((err)=>{
        res.json({err:err.message});
    })
})


module.exports=router;