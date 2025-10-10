const express=require('express');
const { AuthMiddleware } = require('../middlewares/userMiddleware');
const { create, findAll } = require('../controllers/projectController');
const router=express.Router()

router.post('/create',AuthMiddleware,create);
router.get('/get',AuthMiddleware,findAll)


module.exports=router;