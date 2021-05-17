const Router = require("express-promise-router");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
const pool = require("../pool");
const authenticateJWT = require("../authMiddleware");

const router = new Router();

router.get("/all", authenticateJWT, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT v.id, v.model, v.mark, vd.engine_state FROM vehicles v
	JOIN vehicle_details vd ON vd.vehicle_id = v.id`
  );
  console.log("rows.length", rows.length);
  res.send(rows);
});

router.get(
  "/:id",
  [authenticateJWT, [check("id").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus("Неверные параметры запроса.", 400);
    }

    const { id } = req.params;

    console.log("id", id);

    const { rows } = await pool.query(
      `SELECT * FROM vehicles v
	      JOIN vehicle_details vd ON vd.vehicle_id = v.id 
		    where v.id=$1`,
      [id]
    );

    console.log("queryRes", rows);

    res.send(rows[0]);
  }
);

router.get(
  "/vehicle-errors/:vehicleId",
  [authenticateJWT, [check("vehicleId").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus("Неверные параметры запроса.", 400);
    }

    const { vehicleId } = req.params;

    console.log("vehile errors");

    const { rows } = await pool.query(
      `select * from vehicle_error ve
      join errors e on e.id = ve.error_id
      where ve.vehicle_id = $1
      order by ve.occur_date_time desc`,
      [vehicleId]
    );

    console.log("queryRes", rows);

    res.send(rows);
  }
);

router.get(
  "/vehicle-errors/reasons/:dtcCode",
  [authenticateJWT, [check("dtcCode").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus("Неверные параметры запроса.", 400);
    }

    const { dtcCode } = req.params;

    const result = await axios.get(
      `https://car-code.p.rapidapi.com/obd2/${dtcCode}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "car-code.p.rapidapi.com",
          useQueryString: true,
        },
      }
    );

    const reasonsStr = result.data.cause.join(" ;");

    console.log("reasonsStr", reasonsStr);

    const translatedRes = await axios.post(
      "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      { q: reasonsStr, target: "ru", source: "en" },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "accept-encoding": "application/gzip",
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
          useQueryString: true,
        },
      }
    );

    console.log("translatedRes.data", translatedRes.data);

    res.send(translatedRes.data);
  }
);

module.exports = router;
