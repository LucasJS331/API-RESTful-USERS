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
   
  var upload = multer({ storage: storage });

module.exports = upload;