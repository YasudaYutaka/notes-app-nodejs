const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    // verify duplicate notes.
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((notes) => notes.title !== title);

    if(notesToKeep.length < notes.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow('Your notes'));
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const searchedNote = notes.find((note) => note.title === title);
    if(searchedNote) {
        console.log(chalk.inverse(searchedNote.title));
        console.log(searchedNote.body);
    } else {
        console.log(chalk.red.inverse('No such note'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}