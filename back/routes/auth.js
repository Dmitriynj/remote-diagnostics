const Router = require("express-promise-router");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../pool");

const router = new Router();
// export our router to be mounted by the parent application

router.post(
  "/login",
  [check("email").exists(), check("password").exists()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }

    const { password, email } = req.body;
    const {
      rows: [user],
    } = await pool.query({
      text: "SELECT password FROM users where email=$1",
      values: [email],
    });

    if (!user) {
      throw new Error("Пользователя с таким email не существует!");
    }

    console.log("password", password);
    console.log("user.password", user.password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("bad password");
    }

    res.sendStatus(200);
  }
);

module.exports = router;
