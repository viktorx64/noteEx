console.log("NoteEx version 1.2.0");
document.getElementById("readNote").style.display = "none"; //hide

//user chooser
var userId;     //an id so you cant cheat the system to easily
//all the notes from one user
var notes;

function chooseUser(user) {
    userId = user;
    filterNotes(user);
    //hide users adn show notes
    document.getElementById("users").style.display = "none";
    document.getElementById("readNote").style.display = "none";
    document.getElementById("notesPage").style.display = "block";
    loadNote();
}

function showNotes() {
    document.getElementById("users").style.display = "none";
    document.getElementById("readNote").style.display = "none";
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
        var title = document.createElement("h3");
        var created = document.createElement("p");
        var edited = document.createElement("p");
        //insert info
        var titleNode = document.createTextNode(notes[i].fields.title);
        var createdNode = document.createTextNode("created: " + notes[i].fields.created);
        var editedNode = document.createTextNode("edit: " + notes[i].fields.edit);
        //append text to 'p' tags
        title.appendChild(titleNode);
        created.appendChild(createdNode);
        edited.appendChild(editedNode);
        //add to this note
        note.appendChild(title);
        note.appendChild(created);
        note.appendChild(edited);
        note.setAttribute("onclick","openEditor(" + i + ")");
        note.className = "col-sm-6 notering";
        //add to note list
        List.appendChild(note);
        console.log(titleNode); // tester
    }
}

function openEditor(id) {
    if (id=="new") {
        //Todo create new note code
        document.getElementById("Title").value = "";
        document.getElementById("Content").value = "";
        //make save button work
        document.getElementById("save").setAttribute("onclick", "createNote()");
    } else {
        //load note data into page
        document.getElementById("Title").value = notes[id].fields.title;
        document.getElementById("Content").value = notes[id].fields.content;
        //make save button work
        document.getElementById("save").setAttribute("onclick", "editNote(" + id + ")");
    }
    //hide other stuff and show editor/view page
    document.getElementById("users").style.display = "none";
    document.getElementById("readNote").style.display = "block";
    document.getElementById("notesPage").style.display = "none";
}

function createNote() {
    //
    fetch(`https://api.airtable.com/v0/appoHaXAczcm9r8T5/Table%201?api_key=keyhUeGc1q8yCVQdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "records": [
                  {
                      "fields": {
                          "Name": "created with code",
                          "title": document.getElementById("Title").value,
                          "content": document.getElementById("Content").value,
                          "created" : Date.now(),
                          "edit": Date.now(),
                          "userId":  userId
                      }
                  }
              ]
          })
        })
        .then(response => response.json())
        loadData();
}

function editNote(id) {
    //same as before but with patch
    fetch(`https://api.airtable.com/v0/appoHaXAczcm9r8T5/Table%201?api_key=keyhUeGc1q8yCVQdl`, {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "records": [
                  {
                        "id": notes[id].id,
                        "fields": {
                          "Name": "created with code",
                          "title": document.getElementById("Title").value,
                          "content": document.getElementById("Content").value,
                          "edit": Date.now(),
                          "userId":  userId
                      }
                  }
              ]
          })
        })
        .then(response => response.json())
}

window.onload = loadData;