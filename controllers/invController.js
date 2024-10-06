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

module.exports = invCont