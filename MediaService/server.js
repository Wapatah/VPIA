const express = require("express");
const multer = require("multer");
const path = require("path");
let cors = require("cors");
require("dotenv").config({ path: "../.env" });

const https = require("https");
const fs = require("fs");

const httpsOptions = {
  cert: fs.readFileSync("/etc/letsencrypt/live/vpia.wapatah.com/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/vpia.wapatah.com/privkey.pem")
};

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.static("upload"));
app.use(express.static(path.join(__dirname, "upload/img")));

const url = `${process.env.MEDIASERVICE}/`;

app.post("/upload", upload.any(), (req, res) => {
  if (req.files) {
    res.json({ location: url + req.files[0].filename });
  } else {
    throw "error";
  }
});

https.createServer(httpsOptions, app).listen(process.env.MEDIAPORT, () => {
  console.log(`Media microservice listening at ${process.env.MEDIASERVICE}`);
});
