const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController")
const auth = require("../middleware/admin-midleware");
const multerM = require("../middleware/multer-midleware");

//user routes
router.post("/user",auth, multerM.single("image"), userController.create);
router.get("/users",auth, userController.findAll);
router.get("/user/:id",auth, userController.findOne);
router.put("/user/:id",auth, multerM.single("image"), userController.edit);
router.delete("/user/:id",auth, userController.remove);
router.post("/recover", userController.recoverPassword);
router.post("/changePassword", userController.changePassword);
router.post("/auth", userController.login);

module.exports = router;