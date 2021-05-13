const Router = require("express-promise-router");
const pool = require("../pool");

const router = new Router();
// export our router to be mounted by the parent application

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
    id,
  ]);
  res.send(rows[0]);
});

module.exports = router;
