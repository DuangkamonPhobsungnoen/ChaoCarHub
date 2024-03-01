const express = require('express');
const pool = require('../config.js')

router = express.Router();

router.get("/return", async function (req, res, next) {
    // return res.status(200).json('get return')
    try {
            const current = new Date();
            const month = (current.getMonth() + 1).toString().padStart(2, '0');
            const date = `${current.getFullYear()}-${month}-${current.getDate()}`;
            console.log('Current Date: ', date);
      const [rows, fields] = await pool.query(`SELECT *, DATE_FORMAT(r_day_return, "%Y-%m-%d") as dayReturn 
                                                FROM rental 
                                                left outer join car using(car_id) 
                                                left outer join user using(u_id) 
                                                left outer join return_car using (r_id)
                                                WHERE r_status = "return" and
                                                re_id is NULL
                                                and (? > r_day_return); `, [date])
      return res.json(rows)
    } catch (err) {
      return res.status(500).json(err)
    }
  
  });


exports.router = router;