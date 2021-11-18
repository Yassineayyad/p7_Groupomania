const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });
// on exprote le middleware
module.exports = (req, res, next) => {
  const secretToken = process.env.TOKEN_SECRET;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.verify(token, secretToken);
    const userId = tokenDecoded.userId;
    const isAdmin = tokenDecoded.isAdmin;
    console.log("-----> token :");
    console.log(token);

    console.log("-----> tokenDecoded :");
    console.log(tokenDecoded);

    console.log("-----> userId :");
    console.log(userId);
    console.log("-----> isAdmin :");
    console.log(isAdmin);

    if (req.body.userId && req.body.userId !== userId && isAdmin == false) {
      console.log("User ID non valable");
      throw "Le user ID n'est pas valable";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ err: "Requete non authentifiée !" });
  }
};
