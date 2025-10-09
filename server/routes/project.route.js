const express=require('express');
const { AuthMiddleware } = require('../middlewares/userMiddleware');
const { create } = require('../controllers/projectController');
const router=express.Router()

router.post('/create',AuthMiddleware,create)


module.exports=router;