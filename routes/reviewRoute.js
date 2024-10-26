// Needed Resources 
const express = require("express")
const router = new express.Router() 
const util = require("../utilities");
const reviewValidate = require("../utilities/review-validate")
const reviewController = require("../controllers/reviewController");

router.get("/", util.handleErrors(reviewController.buildByReviewId));
router.get("/add-review", util.handleErrors(reviewController.buildAddReview));

//post method
router.post('/add-review',
    reviewValidate.registrationRules(),
    reviewValidate.checkRegData,
    util.handleErrors(reviewController.registerReview)
)

module.exports = router;