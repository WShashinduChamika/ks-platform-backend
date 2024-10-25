const express = require('express')
const {registerUser, loginUser} = require("../controllers/user_controller");

const router = express.Router()

router.post('/api/user/register',registerUser)

router.post('/api/user/login',loginUser)


module.exports = router