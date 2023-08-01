require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.conn");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { default: mongoose } = require("mongoose");

connectDB();

const PORT = process.env.PORT || 3500;
//custom middleware logger
app.use(logger);
//cors means cross origin resource sharing
app.use(cors(corsOptions));
//middleware 3 types builtin custom 3rd party
//this is for form data
app.use(express.urlencoded({ extended: false }));
//built in middleware for json
app.use(express.json());
//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//Routes main,subdir,employees,
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

//Route Handlers
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("MongoDB 💾 Connected 💃🏾🍺");
  app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}🚀📶`);
  });
});
