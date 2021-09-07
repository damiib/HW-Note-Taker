const util = require("util");
const fs = require("fs");

//google npm uuid
const uuid = require("uuid/v1");

const rFile = util.promisify(fs.readFile);
const wFile = util.promisify(fs.writeFile);

class Notes {
  //reads the contents of the db.json
  read() {
    return rFile("db/db.json", "utf8");
  }
  //this will take the note that is written and write it into out db.json
  write(data) {
    return wFile("db/db.json", JSON.stringify(data));
  }

  getNotes() {
    return this.read().then((data) => {
      let notes;

      try {
        //json object is currently stringified so we need to parse it
        notes = [].concat(JSON.parse(data));
      } catch (err) {
        notes = [];
      }

      return notes;
    });
  }

  createNote(data) {
    const { title, text } = data;

    //use uuid to construct a unique id

    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // get the current data that lives in the db.json and add our new note at the end
    return this.getNotes()
      .then((note) => [...note, newNote])
      .then((newNotes) => this.write(newNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((data) => data.filter((filteredData) => filteredData.id !== id))
      .then((finalData) => this.write(finalData));
  }
}

module.exports = new Notes();
