let router=require("express").Router();

router.use('/user',require('./user'));
router.use('/upload',require('./upload'));
router.use('/externalAuth',require('./externalAuth'));
router.use('/order',require('./order'));
router.use('/nft',require('./nft'));
router.use('/artist',require('./artist'));
router.use('/admin',require('./admin'));
module.exports=router;