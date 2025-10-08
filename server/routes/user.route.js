const express = require('express');
const { registerUser, loginUser, logoutUser, getUsers } = require('../controllers/userControllers');
const { AuthMiddleware } = require('../middlewares/userMiddleware');
const router = express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',AuthMiddleware,logoutUser)
router.get('/allUsers',AuthMiddleware,getUsers)
module.exports = router;