console.log("NoteEx version 1.0.1");


//user chooser
var userId;     //an id so you cant cheat the system to easily
//all the notes from one user
var notes;

function chooseUser(user) {
    userId = user;
    filterNotes(user);
    //hide users adn show notes
    document.getElementById("users").style.display = "none";
    document.getElementById("notesPage").style.display = "block";
}

function loadData() {
    fetch("https://api.airtable.com/v0/appoHaXAczcm9r8T5/Table%201?api_key=keyhUeGc1q8yCVQdl")
        .then(response => response.json())
        .then(data => notes = data.records)
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
    notes = dummyNotes; // set notes with only the users
}

function loadNote() {
    //list all notes on page
    var List = document.getElementById("notes");
    //loop all the info into the elements
    for (var i = 0; i < notes.length; i++) { 
        //create html elements
        var note = document.createElement("div");
        var title = document.createElement("p");
        var titleNode = document.createTextNode(notes[i].fields.title);
        title.appendChild(titleNode);
        note.appendChild(title);
        List.appendChild(note);
        console.log(titleNode); // tester
    }
}

window.onload = loadData;