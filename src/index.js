let express = require("express");
let app = express();
let router = require("../routes/routes");
 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/",router);
app.use("/uploads", express.static("uploads"));

module.exports = app;

