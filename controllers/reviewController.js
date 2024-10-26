const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

const reviewCont = {}

reviewCont.buildByReviewId = async function (req, res, next) {
    const grid = await utilities.buildReviewHome()
    let nav = await utilities.getNav()
    res.render("./review/reviews", {
      title: "Customer Reviews",
      nav,
      grid,
    })
  }


  reviewCont.buildAddReview = async function (req, res, next){
    let nav = await utilities.getNav()
    res.render("./review/add-review", {
      title: "Add Review",
      nav,
    })
  }

reviewCont.registerReview = async function(req, res, next) {
    let nav = await utilities.getNav()
    const { review_car, review_rating, review_name, review_description } = req.body
  
    const regResult = await reviewModel.insertNewReview(
        review_car, 
        review_rating, 
        review_name, 
        review_description
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you registered your review! Please refresh the page and take a look.`
      )
      res.status(201).render("review", {
        title: "Review",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("review/reviews", {
        title: "Registration",
        nav,
      })
    }
  }

  module.exports = reviewCont