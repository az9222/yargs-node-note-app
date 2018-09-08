const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString); //adding a new note will no longer remove
    } catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note)=> {
        return note.title === title;
    })

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } 
};

var getAll =  () => { 
    return fetchNotes();
};

var getNote = (title) => { 
    var notes = fetchNotes();
    //use filter to find the title we are looking for
    var filteredTitle = notes.filter((note)=>{return note.title === title});
    return filteredTitle[0];
};

var removeNote = (title) => {
    //fetch the note
    var notes = fetchNotes();
    //filter out the note with the title of argument
    var filteredNotes = notes.filter((note)=>{return note.title !== title})
    //save new notes array
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    //break on this line and use repl to output note
    //use read command with --title
    console.log("---");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};