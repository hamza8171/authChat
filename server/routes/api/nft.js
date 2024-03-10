let mongoose=require("mongoose");
let router=require("express").Router();

const Nft=require('./../../models/Nft');
const User=mongoose.model("User");
const {OkResponse,BadRequestResponse,UnauthorizedResponse,ConflictResponse
}=require("express-http-response");

const auth=require("./../auth");



router.get('/',(req,res,next)=>{
   res.send({message:"Nft works"});
});

router.post('/add',auth.user,(req,res,next)=>{
        const id=req.body.id;
        console.log("id",id);
      const nfts=new Nft({
        slug:req.body.slug,
        tokenId:req.body.tokenId,
        status:req.body.status,
        price:req.body.price,
        category:req.body.category,
        owner:req.user._id,
        history:[
            {
                desc:"sell",
                date:Date.now(),
                actionBy:req.user._id,
                modelType:"User"
            }
        ]

      });
      nfts.save().then((nft)=>{
        if(!nft) return next(new BadRequestResponse("no nft found"));
        return next(new OkResponse({NFT:nft}));
      }).catch((err)=>{
        res.send({err:err.message});
      })
    


});

router.get('/All',(req,res,next)=>{

Nft.find({}).populate("history.actionBy").then((resp)=>{
  console.log("response",resp);
   res.json({NFT:resp});
   
})


})


module.exports=router;