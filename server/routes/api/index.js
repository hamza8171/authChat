let router=require("express").Router();

router.use('/user',require('./user'));
router.use('/upload',require('./upload'));
router.use('/externalAuth',require('./externalAuth'));
router.use('/order',require('./order'));
router.use('/nft',require('./nft'));


module.exports=router;