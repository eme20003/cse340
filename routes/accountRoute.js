// Needed Resources 
const express = require("express")
const router = new express.Router() 
const util = require("../utilities")
const accController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

router.get("/login", util.handleErrors(accController.buildLogin))
router.get("/register", util.handleErrors(accController.buildRegister))

//post method
router.post('/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    util.handleErrors(accController.registerAccount)
)

module.exports = router;
