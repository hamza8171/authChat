let router =require("express").Router();
let mongoose=require("mongoose");
let {BadRequestResponse,OkResponse,UnauthorizedResponse} =require("express-http-response");
let User =mongoose.model("User");
let Artist=require("../../models/Artist");
let Nft=require("../../models/Nft");
let Order=require("../../models/Order");
let {backend}=require("../../config");
let auth=require("../auth");


//start routing for admin module
router.param("email",(req,res,next,email)=>{
User.findOne({email:email}).then((user)=>{
  
    if(!user) next(new BadRequestResponse("user not found"));
    req.updateUser=user;
    next()
}).catch((err)=>{
    console.log(err);
})

});

router.param('nft',(req,res,next,slug)=>{
    Nft.findOne({slug:slug}).then((nft)=>{

        if(!nft) return next(new BadRequestResponse("no nft found"));
        req.nft=nft;
        next();
    })

});

router.delete('/user/:email',auth.required,auth.admin,(req,res,next)=>{

let query={
    owner:req.updateUser._id
}
let admin ;
admin=User.findOne({role:admin});

Nft.updateMany(query,{$set:{owner:req.user._id}});


req.updateUser.deleteOne().then((resp)=>{
    if(!resp) return next(new BadRequestResponse("User not deleted"));
    return next(res.send({message:"User deleted Successfuly"}));
}).catch((err)=>{
    res.send({message:err.message});
})


})


router.get('/nfts',auth.required,auth.admin,(req,res,next)=>{
    Nft.find({}).then((resp)=>{
        console.log(resp)
        if(!resp ) return next(BadRequestResponse("no nft found"));
        return next(res.send({nfts:resp}));

    })
})


router.put('/assign/artist/:nft',auth.required,auth.admin,(req,res,next)=>{
    query={
        slug:req.body.slug
    }
    Artist.findOne(query).then((artist)=>{
        if(!artist) return next(new BadRequestResponse("no artist found"));

        req.nft.owner=artist._id;
        req.nft.history.push({
            desc:"assigned",
            date:Date.now(),
            actionBy:artist._id,
            modelType:"Artist"
        });
        req.nft.status=req.body.status;
        req.nft.price=req.body.price;
        req.nft.category=req.body.category;


        req.nft.save().then((resp)=>{
                if(!resp) return next(new BadRequestResponse("nft assigned failur"));
                return next(res.send({updatedNft:resp}));
        })


    })



})


module.exports=router;