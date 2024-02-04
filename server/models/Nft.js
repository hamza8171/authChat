let mongoose=require("mongoose");
let uniqueValidator =require("mongoose-unique-validator");
let mongoosePagiante=require("mongoose-paginate-v2");
const slug=require("slug");

const NftSchema=new mongoose.Schema({
slug:{
    type:String,
    required:true,
    unique:true
},
tokenId:{type:Number,required:true},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},

history:{
    type:[{
        desc:{type:String,
        enum:["assigned","sell","resell"]},
        date:Date,
        actionBy:{type:mongoose.Schema.Types.ObjectId,refPath:"history.modelType"},
        modelType:{type:String,enum:["User","Artist"],required:true}
    }

 ]
},
status: {
    type: Number,
    enum: [
        0, // Unassigned
        1, // Assigned
        2, // Sold out
        3, //Resell
    ],
    default: 0
},
    price: {
        type: String,
        default: "0",
    },
    category: {
        type: String,
        enum: ["gold", "platinum", "diamond"],
        default: "gold",
    },






},{timestamp:true});

NftSchema.plugin(uniqueValidator,{message:"taken"});

const autopopulate=(next)=>{

    this.populate("owner");
    this.populate("actionBy");
    next();
}

NftSchema.pre("find",autopopulate);
NftSchema.pre("findOne",autopopulate);
NftSchema.pre('validate',function(next){
if(!this.slug){
    this.slugify();
    
}
next();
});

NftSchema.methods.slugify=()=>{

    this.slug= slug(((Math.random() * Math.pow(36, 6)) | 0).toString(36));
}
NftSchema.methods.toJSON = function () {
	return {
		slug: this.slug,
		tokenId: this.tokenId,
		tokenURI: this.tokenURI,
		owner: this.owner,
		assignedTo: this.assignedTo,
		music: this.music,
		history: this.history,
		listingPrice: this.listingPrice,
		price: this.price,
		category: this.category,
		perks: this.perks,
		status: this.status,
		isTransferred: this.isTransferred,
		createdAt: this.createdAt,
		isVisible: this.isVisible,
	};
};

module.exports=mongoose.model("Nft",NftSchema);