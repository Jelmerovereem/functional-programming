const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("static"));

app.set("view engine", "ejs");
app.get("/", renderHome);

function renderHome(req, res) {
	res.render("index.ejs");
}

app.listen(8000, () => console.log("server is running on port 8000"));