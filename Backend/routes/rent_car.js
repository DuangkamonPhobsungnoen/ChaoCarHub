const express = require('express');
const pool = require('../config.js')


router = express.Router();

//search car
router.post("/search", async function (req, res, next) {
  const { start_date, end_date } = req.body
  const { brand, price, seat } = req.body
  console.log(brand, price, seat)
  const arrprice = price.split("-")
  const minprice = parseInt(arrprice[0])
  const maxprice = parseInt(arrprice[1])
  console.log(arrprice[0], arrprice[1])
  try {
    //all car can't rent [array Id car]
    // const [rows1, fields1] = await pool.query('SELECT car_id FROM rental where (r_day_pickup between ? and ?) OR (r_day_return between ? and ?);',
    // [start_date, end_date, start_date, end_date])
    // res.send(rows1)

    if (brand == 'All') {
      const [rows1, fields1] = await pool.query(`SELECT * FROM car where (car_rentprice between ? and ?) and (car_seat = ?) 
                                                  and car_id not in (
                                                                    SELECT car_id 
                                                                    FROM rental 
                                                                    where (r_day_pickup between ? and ?) 
                                                                    OR (r_day_return between ? and ?)
                                                                    AND (r_status != 'history')
                                                                    )`,
        [minprice, maxprice, seat, start_date, end_date, start_date, end_date])
      return res.json(rows1)
    } else {
      const [rows, fields] = await pool.query('SELECT * FROM car WHERE car_brand=? and car_rentprice between ? and ? and car_seat = ?',
        [brand, minprice, maxprice, seat])
      return res.json(rows)
    }

  } catch (err) {
    return res.status(500).json(err)
  }

});

//detail car
router.get("/detailcar/:carId", async function (req, res, next) {
  console.log(req.params.carId)
  try {

    const [rows, fields] = await pool.query("SELECT * FROM car where car_id = ?",
      [req.params.carId]);
    return res.json(rows);

  } catch (err) {
    console.log(err)
    return next(err);
  }
});


router.post("/rent", async function (req, res, next) {
  const { totalPrice, timePickup, dayPickup, timeReturn, dayReturn, placePickup, placeReturn, amountDays, carId, userId } = req.body
  console.log(timePickup, dayPickup, timeReturn, dayReturn, placePickup, placeReturn, amountDays)
  // console.log("hi ", timePickup, dayPickup, timeReturn, dayReturn)
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    //check overlap car rent
     const [rows1, fields1] = await pool.query(`SELECT * FROM rental where ((r_day_pickup between ? and ?) OR (r_day_return between ? and ?)) and (car_id = ?) AND (r_status != 'history');`,
    [dayPickup, dayReturn, dayPickup, dayReturn, carId])
    console.log("row1", rows1)

    if(rows1.length === 0){
      const [rows, fields] = await conn.query("INSERT INTO rental(r_totalprice, r_time_pickup, r_day_pickup, r_time_return, r_day_return, r_place_pickup, r_place_return, r_amountdays, r_status, car_id, u_id, r_timestamp) " +
      "VALUE(?, ?, ?, ?, ?, ?, ?, ?, 'checkout', ?, ?, CURRENT_TIMESTAMP) ",
      [totalPrice, timePickup, dayPickup, timeReturn, dayReturn, placePickup, placeReturn, amountDays, carId, userId]);
      console.log("insert ", rows.insertId)
      console.log("done yay")
      await conn.commit()
      return res.json(rows); 
    }
    
    res.send({ message: 400 })

  } catch (err) {
    await conn.rollback()
    res.json({ message: "can't find car Id" })
    return next(err);
  }finally {
    conn.release()
}
});


exports.router = router;