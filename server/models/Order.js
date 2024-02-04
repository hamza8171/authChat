const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");
const slug=require("slug");

const orderSchema=new mongoose.Schema({
slug:{
    type:String,
    required:true,
   // unique:true
},
status:{
        type:String,
        enum:["initiated","pending","completed"],
        default:"initiated",


},
buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",



},
fiatAmount:{
    type:Number,
    require:true,
}


},{
    timestamps:true
}
);

mongoose.plugin(uniqueValidator,{message:"Taken"});

const autopapulate=(next)=>{

           this.populate("buyer");
            next();


}

//orderSchema.pre("find",autopapulate);
//orderSchema.pre("findOne",autopapulate);

orderSchema.pre("validate",function(next){
    if(!this.slug){
        this.slugify();
    }
    next();
})

orderSchema.methods.slugify=function(){
	this.slug = slug(((Math.random() * Math.pow(36, 6)) | 0).toString(36));
};
orderSchema.methods.toJSON=function(){
return {
id:this._id,
slug:this.slug,
buyer:this.buyer,
status:this.status,
fiatAmount:this.fiatAmount,

}

}

module.exports=mongoose.model("Order",orderSchema);