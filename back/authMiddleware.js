const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    console.log("token", !!authToken ? "exists" : "not found");

    jwt.verify(authToken, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.send(
          "Ваша сессия окончена. Пожалуйста войдите в систему еще раз.",
          403
        );
      }

      console.log("user verified");

      req.user = user;
      next();
    });
  } else {
    return res.send("Сессионый токен не найден", 403);
  }
};

module.exports = authenticateJWT;
