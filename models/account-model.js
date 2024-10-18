
const pool = require("../database/")
/* *****************************
*   Register new account
* *************************** */

async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = `INSERT INTO account 
    (account_firstname, account_lastname, account_email, account_password, account_type) 
    VALUES ($1, $2, $3, $4, 'Client') RETURNING *`
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) { // use "error" instead of "err"
    console.error('Error message: ', error.message); // "error.message" should be used here
    throw error; // rethrow the correct error object
  }
}

  module.exports = {registerAccount}