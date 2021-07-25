const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")
const auth = require("../middleware/admin-midleware");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/")
    },
    filename: function (req, file, cb, next) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
        
    }
  })
   
  var upload = multer({ storage: storage })

//user routes

router.post("/user",auth, upload.single("image"), UserController.create);
router.get("/users",auth, UserController.findAll);
router.get("/user/:id",auth, UserController.findOne);
router.put("/user/:id",auth, upload.single("image"), UserController.edit);
router.delete("/user/:id",auth, UserController.remove);
router.post("/recover", auth, UserController.recoverPassword);
router.post("/changePassword", UserController.changePassword);
router.post("/auth", UserController.login);



module.exports = router;