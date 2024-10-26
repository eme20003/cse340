const pool = require("../database/")

async function insertNewReview(review_car, review_rating, review_name, review_description){
    try {
      const sql = `INSERT INTO public.review 
      (review_car, review_rating, review_name, review_description) 
      VALUES ($1, $2, $3, $4, 'Client') RETURNING *`
      return await pool.query(sql, [review_car, review_rating, review_name, review_description])
    } catch (error) { // use "error" instead of "err"
      console.error('Error message: ', error.message); // "error.message" should be used here
      throw error; // rethrow the correct error object
    }
  }

  async function getReviewsById(){
      return await pool.query('SELECT * FROM public.review ORDER BY review_car')
  }
  
    module.exports = {getReviewsById, insertNewReview}