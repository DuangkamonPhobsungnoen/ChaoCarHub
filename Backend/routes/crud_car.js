const express = require('express');
const path = require("path");
const pool = require('../config.js')
const multer = require("multer");
const Joi = require('joi');

router = express.Router();

// Validate
const carSchema = Joi.object({
  car_code: Joi.string().required(), 
  car_brand: Joi.string().required(), 
  car_model: Joi.string().required(), 
  car_seat: Joi.number().min(2).max(20).required(), 
  car_bag: Joi.number().min(1).max(5).max(50000).required(), 
  car_rentprice: Joi.number().min(500).max(20000).required(),
  car_status: Joi.string().required(), 
})

// SET STORAGE 
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//for homepage
router.get("/car/nissan", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM car WHERE car_brand = "Nissan"')
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }

});

router.get("/car/honda", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM car WHERE car_brand = "Honda"')
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }

});

router.get("/car/toyota", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM car WHERE car_brand = "Toyota"')
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/car/other", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM car WHERE car_brand not in( "Toyota", "Honda", "Nissan")')
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }
});

// select Car
router.get("/car", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM car')
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }

});

router.get("/car/:id", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM car WHERE car_id=?', [req.params.id])
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }

});

const upload = multer({ storage: storage });

//   add car 
router.post("/car", upload.single("myImageCar"), async function (req, res, next) {
    try {
    await carSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err)
  }

  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const { car_code, car_brand, car_model, car_seat, car_bag, car_rentprice, car_status } = req.body
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [rows1, fields1] = await conn.query('select car_code from car where car_code = ?',
      [car_code])
    if (rows1.length === 0) {
      console.log("id is duplicate")
      const results = await conn.query(
        "INSERT INTO car(`car_code`, `car_brand`, `car_model`, `car_seat`, `car_bag`, `car_rentprice`, `car_img`, `car_status`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
        [car_code, car_brand, car_model, car_seat, car_bag, car_rentprice, file.path.substr(6), car_status]
      );
    }
    else {
      return res.json({ check: false })
  }

    await conn.commit();
    return res.json({ message: "success" });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.delete('/car/:id', async function (req, res, next) {
  const carId = req.params.id
  try {
    const [rows, fields] = await pool.query(
      'DELETE FROM car WHERE car_id = ?', [carId]
    )
    res.json("success")
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post("/test", upload.single("myImageCar"), async function (req, res, next) {
  const file = req.file;

});

//   update car 
router.put("/updatecar/:id", upload.single("myImageCar"), async function (req, res, next) {
  try {
    await carSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err) 
  }
  const file = req.file;
  const { car_code, car_brand, car_model, car_seat, car_bag, car_rentprice, car_status } = req.body
  console.log(file)
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    if (file != undefined){
      const results1 = await conn.query(
        "UPDATE car SET car_code=?, car_brand=?, car_model=?, car_seat=?, car_bag=?, car_rentprice=?, car_status=?, car_img=? WHERE car_id=?",
        [car_code, car_brand, car_model, car_seat, car_bag, car_rentprice, car_status, file.path.substr(6), req.params.id]
      );
    }else{
      const results2 = await conn.query(
        "UPDATE car SET car_code=?, car_brand=?, car_model=?, car_seat=?, car_bag=?, car_rentprice=?, car_status=? WHERE car_id=?",
        [car_code, car_brand, car_model, car_seat, car_bag, car_rentprice, car_status, req.params.id]
      );
    }
   


    const results2 = await conn.query("SELECT * FROM car");

    await conn.commit();
    return res.json(results2);
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/search", async function (req, res, next) {
  const searchInput = req.query.searchInput
  console.log(searchInput);
  try {
    const [rows1, fields1] = await pool.query("SELECT *  FROM car WHERE concat(car_code, ' ', car_brand, ' ', car_model, ' ', car_seat, ' ', car_bag, ' ', car_rentprice) LIKE ?",
    [`%${searchInput}%`]);

    return res.json(rows1);
  } catch (err) {
    console.log(err)
    return next(err);
  }
});

router.get("/admin/cus", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(`SELECT * FROM user`)
    return res.json(rows)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/searchcus", async function (req, res, next) {
  const searchInputCus = req.query.searchInputCus
  console.log(searchInputCus);
  try {
    const [rows1, fields1] = await pool.query("SELECT *  FROM user WHERE concat(u_id, ' ', u_fname, ' ', u_lname) LIKE ?",
    [`%${searchInputCus}%`]);

    return res.json(rows1);
  } catch (err) {
    console.log(err)
    return next(err);
  }
});
exports.router = router;