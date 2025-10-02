const express = require('express');
const { registerUser, loginUser, logoutUser, getUsers } = require('../controllers/userControllers');
const router = express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/allUsers',getUsers)
module.exports = router;