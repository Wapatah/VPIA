const express = require("express");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/upload" });
const path = require("path");
let cors = require("cors");

const app = express();
const PORT = 30500;

app.use(cors());
app.use(express.static("upload"));
app.use(express.static(path.join(__dirname, "upload/img")));

const url = `http://localhost:${PORT}/`;

app.post("/upload", upload.any(), (req, res) => {
  if (req.files) {
    res.json({ location: url + req.files[0].filename });
  } else {
    throw "error";
  }
});

app.listen(PORT, () => {
  console.log("Listening at http://localhost:" + PORT);
});
