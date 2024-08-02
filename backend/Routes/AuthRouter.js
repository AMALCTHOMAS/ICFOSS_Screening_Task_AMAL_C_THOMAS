const { signup, login} = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { dashboard,changePassword } = require('../Controllers/DashboardController');
const { verifyToken  } = require('../Middlewares/JWTverification');

const router = require('express').Router();

router.post('/login',loginValidation, login)
router.post('/signup',signupValidation, signup)
router.post('/dashboard',verifyToken,dashboard)
router.post('/changepassword',verifyToken,changePassword)

module.exports = router;