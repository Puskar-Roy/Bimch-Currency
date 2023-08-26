const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const route = require("./routes/routes");
// const
const app = express();

const allowedOrigins = ["https://www.puskarroy.site"];
// const allowedOrigins = ["https://bimch.vercel.app"];
// const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cookieParser());
app.use(bodyParser.json({ limit: "1024mb" }));
app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));
app.use("/api", route);
app.use(cors(corsOptions));

dotenv.config();
require("./database/connectDatabase");

app.listen(process.env.PORT, () => {
  console.log("⚡[Server] Server Start At Port " + process.env.PORT);
});
