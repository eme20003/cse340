const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const invData = await invModel.getInventoryItem(inv_id)
  const grid = await utilities.buildInvIdGrid(invData)
  let nav = await utilities.getNav()
  const className = invData[0].inv_make
  res.render("./inventory/inventory", {
    title: className,
    nav,
    grid,
  })
}

/* ************************************
* Build inv management view
************************** */

invCont.buildInvManagement = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management View",
    nav,
  })
}

/* ****************************
* Build Add Classification View
********************************* */

invCont.buildByClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification",{
    title: "Add Classification",
    nav,
    errors: null
  })
}

/* *******************************
* Build Add Inventory View
**************************** */

invCont.buildByAddInventory = async function (req, res, next){
  let nav = await utilities.getNav()
  let inventoryClassificationList = utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    inventoryClassificationList,
    errors: null
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
invCont.registerClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.registerClassification(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you registered ${classification_name}. Please re-load your page to ensure the changes have been made`
    )
    res.status(201).render("inventory/management", {
      title: "Management View",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

/* ************************
* Process inventory Registration
****************** */

invCont.registerInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const regResult = await invModel.registerInventory(
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you registered ${inv_make}. Please re-load your page to ensure the changes have been made correctly`
    )
    res.status(201).render("inventory/management", {
      title: "Management View",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
    })
  }
}

module.exports = invCont