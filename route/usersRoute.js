const express = require('express') ; 
const {handletheSignUp ,handleLogin} = require('../controller/userController') ;
const router = express.Router() ; 

router.
post('/', handletheSignUp).
post('/login', handleLogin) ; 


module.exports = router ; 