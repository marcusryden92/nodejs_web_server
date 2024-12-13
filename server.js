const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// middleware for handling urlencoded data
app.use(express.urlencoded({ extended: false }));

// middleware for handling json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(path.join(301, "/new-page.html"));
});

// Route handlers
app.get("/hello(.html)?", (req, res, next) => {
  console.log("attem");
  next();
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
