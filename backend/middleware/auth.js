const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Vérification de la présence et validité du token
    const token = req.cookies.token;
    // const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    console.log(decoded.header);
    console.log(decoded.payload);
    if (req.body.userid && req.body.userid !== userId) {
      throw "Invalid user ID";
    } else {
      // token valide, passage au prochain middleware
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Invalid request!") });
    return;
  }
};
