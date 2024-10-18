// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");
const util = require("../utilities");
const invValidation = require('../utilities/add-inventory-validation');
const classificationValidate = require('../utilities/classification-validation');

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to see individual car 
router.get("/detail/:inv_id", invController.buildByInvId);

router.get("/", invController.buildInvManagement);

//route to add classification view

router.get("/add-classification", util.handleErrors(invController.buildByClassification));

//post method
router.post('/add-classification', 
    classificationValidate.classificationRules(),
    classificationValidate.checkRegData,
    util.handleErrors(invController.registerClassification)
)

//route to add inventory

router.get("/add-inventory", util.handleErrors(invController.buildByAddInventory));

//post method
router.post('/add-inventory', 
    invValidation.registrationRules(),
    invValidation.checkRegData,
    util.handleErrors(invController.registerInventory)
)


module.exports = router;