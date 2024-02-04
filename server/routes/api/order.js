const router=require("express").Router();
const {OkResponse,BadRequestResponse,ConflictResponse}=require("express-http-response");
const auth=require('../auth');
const { default: mongoose } = require("mongoose");
const InternalServerErrorResponse = require("express-http-response/lib/http/InternalServerErrorResponse");
const Order=require('./../../models/Order');
const {User}=mongoose.model("User");

router.param('slug',(req,res,next,slug)=>{

Order.findOne({slug}).populate("buyer").exec().then((order)=>{
      if(!order) return next(new BadRequestResponse("order is empty"));
      req.updateOrder=order;
      return next();
})




})





router.post('/Order',auth.user,(req,res,next)=>{
    console.log("user id from body "+req.body.id);
    console.log("user id from auth user "+req.user._id);
    
})
router.post('/addOrder',auth.user,(req,res,next)=>{
   
     
     
      let newOrder=new Order({
            status:req.body.status,
            fiatAmount:req.body.Amount,
            slug:req.body.slug,
            buyer:req.user._id
      


      })
     
    
      newOrder.save().then((order)=>{
           
            if(!order){
                  return next(new BadRequestResponse("Order not registered"));
            }else{

                  res.send(order.toJSON());
                  return next(new OkResponse({res:order}));
            }
      })





});


router.get('/',(req,res,next)=>{

Order.find().populate("buyer").exec().then((response)=>{
      
      return res.json({res:response});
}).catch((err)=>{
      console.log(err);
})



})

router.get('/OneOrder/:slug',(req,res,next)=>{
      if(!req.updateOrder) return next(new BadRequestResponse());
      res.json({Order:req.updateOrder});
     // return next(new OkResponse({Order:req.updateOrder}));
})



module.exports=router;