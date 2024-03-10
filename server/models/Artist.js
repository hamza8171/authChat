let mongoose=require("mongoose"),
slug=require("slug"),
uniqueValidator=require("mongoose-unique-validator"),
publicPics=require("../config").publicPics,
Nft=mongoose.model("Nft");


const artistSchema=mongoose.Schema({
slug:{
    type:String,
    unique:true,
    required:true

},
profileImage:{

type:String,
default: `${publicPics}/artist.png`
},
userName:{
    type:String,
    unique:true,
    required:true
},
nfts:[
    {
type:mongoose.Schema.Types.ObjectId,
ref:"Nft"
    }
],
socialLinks:[{
name:{type:String},
value:{type:String}

}]



},{timestamps:true})

mongoose.plugin(uniqueValidator,{message:"Taken"});
const autoPopulate=function(next){
	this.populate("nfts")
	next()
}

artistSchema.pre("find",autoPopulate);


artistSchema.pre("validate",function(next){
if(!this.slug){
    this.slugify();
    console.log("slug",this.slug);
}
next()
})
artistSchema.methods.slugify=function(){
this.slug=slug(((Math.random() * Math.pow(36, 6)) | 0).toString(36));

}

artistSchema.methods.toJSON=function(){
    return {
        id:this._id,
        slug:this.slug,
       profileImage:this.profileImage,
       socialLinks:this.socialLinks

    }
}

module.exports=mongoose.model("Artist",artistSchema)