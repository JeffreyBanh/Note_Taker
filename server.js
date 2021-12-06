const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const app = express();
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const fileContent = JSON.parse(fs.readFileSync("./db/db.json"))


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//call for notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Start listen
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

// gets notes and save to db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// post new notes
app.post("/api/notes", (req, res) => {
    const notes = fileContent;
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

//deletes notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = fileContent;
    const Non_Deleted_Notes = notes.filter((removeNote) => removeNote.id !== req.params.id)
    fs.writeFileSync("./db/db.json", JSON.stringify(Non_Deleted_Notes));
    res.json(Non_Deleted_Notes);
})
