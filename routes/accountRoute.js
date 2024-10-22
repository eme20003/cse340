// Needed Resources 
const express = require("express")
const router = new express.Router() 
const util = require("../utilities")
const accController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')
const invController = require('../controllers/invController');
const invCont = require("../controllers/invController");

router.get("/login", util.handleErrors(accController.buildLogin))
router.get("/register", util.handleErrors(accController.buildRegister))
router.get("/account", util.handleErrors(accController.buildAccountLogin))
router.get("/", util.checkLogin, util.handleErrors(invCont.buildInvManagement))

//post method
router.post('/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    util.handleErrors(accController.registerAccount)
)

//Process login request
router.post(
    "/login",
    accController.accountLogin,
    regValidate.checkLoginData,
    util.handleErrors(accController.accountLogin)
)

module.exports = router;
