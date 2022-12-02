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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NWQ1ZDUyNTJjZWZkODRhNWY2ZjJjIn0sImlhdCI6MTY2OTcxNTQyNn0.MMH-p7jVeROYxbUpyjeO4ygaR9_BVCM9_DRUQmheb_Q",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NWQ1ZDUyNTJjZWZkODRhNWY2ZjJjIn0sImlhdCI6MTY2OTcxNTQyNn0.MMH-p7jVeROYxbUpyjeO4ygaR9_BVCM9_DRUQmheb_Q",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NWQ1ZDUyNTJjZWZkODRhNWY2ZjJjIn0sImlhdCI6MTY2OTcxNTQyNn0.MMH-p7jVeROYxbUpyjeO4ygaR9_BVCM9_DRUQmheb_Q",
      },
    });
    const json = response.json();
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
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NWQ1ZDUyNTJjZWZkODRhNWY2ZjJjIn0sImlhdCI6MTY2OTcxNTQyNn0.MMH-p7jVeROYxbUpyjeO4ygaR9_BVCM9_DRUQmheb_Q",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    for (let i = 0; i < notes.length; i++) {
      const editableNote = notes[i]; //Pulling notes from notes.map in Notes.js using context api.
      if (editableNote._id === id) {
        editableNote.title = title;
        editableNote.description = description;
        editableNote.tag = tag;
      }
    }
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
