const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

// Databases
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Routes
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.get("/", function (req, res) {
  res.send('BACKEND CARI TIM NIH BOS')
});
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A node.js API is listening to port: ${port}`);
});
