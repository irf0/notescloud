import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //1.GET ALL NOTES
  const getAllNotes = async () => {
    //Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //2.ADD A NOTE
  const addNote = async (title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    const newNote = {
      _id: "6387024eff0bc853a8a4b6wf677f",
      user: "6385d5d5252cefd84a5f6f2c",
      title: title,
      description: description,
      tag: tag,
      date: "2022-11-30T07:12:10.333Z",
      __v: 0,
    };
    setNotes(notes.concat(newNote)); //Adding the new note array
  };

  //3.DELETE A NOTE
  const deleteNote = async (id) => {
    //TODO : API CALL NOTES
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    console.log(json);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    console.log("deleting..."); //Keep only those which is != note._id //Simply keep all except which is being clicked!
    setNotes(newNote);
  };

  //4.EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    const newUpdatedNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < notes.length; i++) {
      const editableNote = notes[i]; //Pulling notes from notes.map in Notes.js using context api.
      if (editableNote._id === id) {
        newUpdatedNotes[i].title = title;
        newUpdatedNotes[i].description = description;
        newUpdatedNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newUpdatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
