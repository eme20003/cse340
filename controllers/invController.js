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
  const classificationSelect = await utilities.buildClassificationList()


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

/* ************************************
* Return Inventory by Classification as JSON
* ***************************** */

invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id){
    return res.json(invData)
  }else {
    next(new Error("No data returned"))
  }
}

/* ***************************************
* Build edit inventory view
* ******************************** */

invCont.editInventoryView = async function (req, res, next){
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryItem(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit" + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***********************************
* Update Inventory Data
* ******************************** */

invCont.updateInventory = async function (req, res, next){
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResults = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_modelreq.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  }else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
  }
}

module.exports = invCont