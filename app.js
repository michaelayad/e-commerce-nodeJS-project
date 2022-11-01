require("dotenv").config();
const express = require("express");
var mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");
const subCategoryRoute = require("./routes/subCategory.route");

mongoose.connect(process.env.DBLINK);

var app = express();

// app.use(cors());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
app.use(express.json());
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/subCategory", subCategoryRoute);

app.listen(process.env.PORT, () => {
  console.log("server listening on port 3000");
});
