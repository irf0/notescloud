import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              deleteNote(note._id); //onClicking we call the function deleteNote with this id
            }}
          ></i>
          <i className="fa-solid fa-pen-to-square mx-5"></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;