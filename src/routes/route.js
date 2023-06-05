const express=require("express");
const router=express.Router();
const {createShortUrl,getUrl}=require("../controller/urlController")

router.post('/url/shortner',createShortUrl);
router.get('/:urlCode',getUrl);

module.exports=router;