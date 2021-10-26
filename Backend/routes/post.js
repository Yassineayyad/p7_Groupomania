// importation de express pour utiliser la fonction router()
const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
// importation du controllers/user.js
const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
/* router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likeDislikePost); */

module.exports = router;
