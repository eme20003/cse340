        /* **********************************
        * Registration Data Validation Rules for Inventory
    * *********************************/
        const utilities = require(".")
        const {body, validationResult} = require("express-validator")
        const validate = {}
    
        /* **********************************
            * Registration Data Validation Rules
        * *********************************/
    
        validate.registrationRules = () => {
            return [
                    //firstname is required and must be string
                    body("inv_make")
                    .trim()
                    .escape()
                    .notEmpty()
                    .isLength({min: 1})
                    .withMessage("Please provide a make"),
        
                    //last name is required and must be string
                    body("inv_model")
                    .trim()
                    .escape()
                    .notEmpty()
                    .isLength({min: 1})
                    .withMessage("Please provide a model."),
        
                    //valid email is required and cannot already exist in the DB
                    body("inv_year")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("Must have a number (no comma)"),
        
                    //password is required and must be strong password
                    body("inv_description")
                    .trim()
                    .notEmpty()
                    .isLength({min: 5})
                    .withMessage("Must have a description over 5 characters"),
    
                    body("inv_image")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("please type in a valid url"),
    
                    body("inv_thumbnail")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("please type in a valid url"),
    
                    body("inv_price")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("please provide a valid price"),
    
                    body("inv_miles")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("please provide a valid number of miles"),
    
                    body("inv_color")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("Please type in a color"),
    
                    body("inv_color")
                    .trim()
                    .escape()
                    .notEmpty()
                    .withMessage("Please choose a classification"),
    
            ]
        }
    
    
        /* ***************************************
        * Check data and return errors or continue to registration
        * **************************************** */
    
        validate.checkRegData = async (req, res, next) => {
            const { account_firstname, account_lastname, account_email} = req.body
            let errors = []
            errors = validationResult(req)
            if(!errors.isEmpty()) {
                let nav = await utilities.getNav()
                res.render("inventory/add-inventory", {
                    errors,
                    title: "Add Inventory",
                    nav,
                    account_firstname,
                    account_lastname,
                    account_email,
                })
                return
            }
            next()
        }
    
        module.exports = validate