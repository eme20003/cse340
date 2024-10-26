const accModel = require("../models/account-model")
const utilities = require("../utilities/")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* *********************************
* Deliver login view
* ******************************* */

async function buildLogin(req, res, next){
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
    })
}

async function buildRegister(req, res, next){
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
    })
}

async function buildAccountLogin(req, res, next){
  let nav = await utilities.getNav()
  res.render("account/account", {
    title: "Management View",
    nav,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body
  
    const regResult = await accModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
      })
    }
  }


  /* ******************************
  * Process login request
  * ************************************** */

  async function accountLogin(req, res){
    let nav = await utilities.getNav()
    const{ account_email, account_password } = req.body
    const accountData = await accountModel.getAccountByEmail(account_email)
    if(!accountData){
      req.flash("notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
      return
    }
    try {
      if (await bcrypt.compare(account_password, accountData.account_password)){
        delete accountData.account_password
        const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expriesIn: 3600 * 1000})
        if(process.env.NODE_ENV === 'development') {
          res.cookie("jwt", accessToken, {httpOnly: true, maxAge: 3600 * 1000})
        } else{
          res.cookie("jwt", accessToken, {httpOnly: true, secure: true, maxAge: 3600 * 1000})
        }
        return res.redirect("/account/")
      }
      else {
        req.flash("message notice", "Please check your credentials and try again.")
        req.status(400).render("account/login", {
          title: "Login",
          nav,
          errors: null,
          account_email,
        })
      }
    } catch(error){
      throw new Error('Access Forbidden')
    }
  }

module.exports = {buildLogin, buildRegister, registerAccount, accountLogin, buildAccountLogin}