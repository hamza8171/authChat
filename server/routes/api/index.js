let router=require("express").Router();

router.use('/user',require('./user'));
router.use('/upload',require('./upload'));
router.use('/externalAuth',require('./externalAuth'))


module.exports=router;