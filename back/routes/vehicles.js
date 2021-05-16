const Router = require("express-promise-router");
const { check, validationResult } = require("express-validator");
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
		    LEFT JOIN vehicle_issue vi ON vi.vehicle_id = vd.vehicle_id
		    LEFT JOIN issues i ON vi.issue_id = i.id
		    where v.id=$1`,
      [id]
    );

    console.log("queryRes", rows);

    res.send(rows[0]);
  }
);

module.exports = router;
