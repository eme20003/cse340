const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* Get all inventory data */
/*
async function getInventories(){
  return await pool.query("SELECT * FROM public.inventory ORDER BY inv_id")
}
*/

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }

async function getInventoryItem(inv_id){
  try{
    const data = await pool.query(
      `SELECT * FROM public.inventory as i
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error){
    console.error("getInventoryItems error: " + error)
  }
}

async function registerClassification(classification_name){
  try{
    const sql =
      `INSERT INTO classification (classification_name)
      VALUES ($1) RETURNING *`
      return await pool.query(sql, [classification_name])
  }catch (error) { // use "error" instead of "err"
    console.error('Error message: ', error.message); // "error.message" should be used here
    throw error; // rethrow the correct error object
  }
}

async function registerInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try{
    const sql =
      `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classificaiton_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`
      return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
  }catch (error) { // use "error" instead of "err"
    console.error('Error message: ', error.message); // "error.message" should be used here
    throw error; // rethrow the correct error object
  }
}
  module.exports = {getClassifications, getInventoryByClassificationId, getInventoryItem, registerClassification, registerInventory};