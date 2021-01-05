const { response } = require("express");

console.log("NoteEx version 1.0.0");


//user chooser
var userId;     //an id so you cant cheat the system to easily
//all the notes from one user
var notes;

function chooseUser(user) {
    userId = user;
}

function loadData() {
    fetch("https://api.airtable.com/v0/appoHaXAczcm9r8T5/Table%201?api_key=keyhUeGc1q8yCVQdl")
        .then(response => response.json())
        .then(data => notes = data.records)
        .then(filterNotes(userId));
}

//not ultra secure but it works for this excerise
function filterNotes(user) {
    var dummyNotes = [];
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].fields.userId == user) {
            //the notes with the same user id get sent to dummy
            dummyNotes.push(notes[i]);
        }
    }
    notes = dummyNotes;
}