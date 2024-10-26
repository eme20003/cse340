const utilities = require(".")
    const {body, validationResult} = require("express-validator")
    const validate = {}

    /* **********************************
        * Registration Data Validation Rules
    * *********************************/

    validate.registrationRules = () => {
        return [
            //firstname is required and must be string
            body("review_car")
            .trim()
            .escape()
            .notEmpty()
            .isLength({min: 1})
            .withMessage("Please provide the car you are reviewing."),

            //last name is required and must be string
            body("review_rating")
            .trim()
            .escape()
            .notEmpty()
            .isLength({min: 1})
            .withMessage("Please provide a single digit rating  0 - 5."),

            //valid email is required and cannot already exist in the DB
            body("review_name")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("A valid name is required."),

            //password is required and must be strong password
            body("review_description")
            .trim()
            .notEmpty()
            .isLength({min: 5})
            .withMessage("Please provide a review or description"),

        ]
    }


    /* ***************************************
    * Check data and return errors or continue to registration
    * **************************************** */

    validate.checkRegData = async (req, res, next) => {
        let errors = []
        errors = validationResult(req)
        if(!errors.isEmpty()) {
            let nav = await utilities.getNav()
            res.render("review/add-review", {
                errors,
                title: "Add Review",
                nav,
            })
            return
        }
        next()
    }

    module.exports = validate