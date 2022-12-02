import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="row my-3">
      <h1>Your Notes</h1>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />; //Value of this is defined in NoteItem
      })}
    </div>
  );
}

export default Notes;
