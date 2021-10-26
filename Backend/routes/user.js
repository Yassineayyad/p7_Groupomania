// importation de express pour utiliser la fonction router()
const express = require("express");
const router = express.Router();
// importation du controllers/user.js
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

// les routes signup et login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth,  userCtrl.getUserProfil);
router.put("/:id", auth, userCtrl.updateProfil);
router.delete("/:id", auth, userCtrl.deleteProfil);

module.exports = router;
