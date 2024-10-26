// Needed Resources 
const express = require("express")
const router = new express.Router() 
const util = require("../utilities")
const accController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')
const invCont = require("../controllers/invController");

router.get("/login", util.handleErrors(accController.buildAccountLogin))
router.get("/register", util.handleErrors(accController.buildRegister))
router.get("/account", util.handleErrors(accController.buildAccountLogin))
router.get("/", util.checkLogin, util.handleErrors(invCont.buildInvManagement))
router.get("/inv/getInventory/:classification_id", util.handleErrors(invCont.getInventoryJSON))

//post method
router.post('/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    util.handleErrors(accController.registerAccount)
)

//Process login request
router.post(
    "/login",
    util.handleErrors(accController.accountLogin),
    regValidate.checkLoginData,
    util.handleErrors(accController.accountLogin)
)

module.exports = router;
