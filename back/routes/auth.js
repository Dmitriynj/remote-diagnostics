const Router = require("express-promise-router");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../pool");

const router = new Router();

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
      text: "SELECT password, avatar, role FROM users where email=$1",
      values: [email],
    });

    if (!user) {
      res.send("Пользователя с таким email не существует!", 404);
      return;
    }

    console.log("password", password);
    console.log("user.password", user.password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.send("Неверный пароль!", 401);
      return;
    }

    const accessToken = jwt.sign(
      { id: user.id, email, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log("avatar", user.avatar);

    res.json({ accessToken, avatar: user.avatar, role: user.role });
  }
);

module.exports = router;
