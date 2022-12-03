import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

//ref is used to give the reference where to make the action

function Notes(props) {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const ref = useRef(null); //Display set to none so modal btn will work hidden
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    refClose.current.click(); //To close the modal
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
    setNote({ id: "", etitle: "", edescription: "", etag: "" }); //Input fields become Blank after clicking the button 'Update Note'
    props.showAlert("Note updated successfully!", "success");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    minLength={5}
                    required
                    spellCheck="false"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="edescription">Description</label>
                  <textarea
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleChange}
                    minLength={5}
                    required
                    rows="3"
                    spellCheck="false"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to display !"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              // updateNote={updateNote}
              key={note._id}
              note={note}
              showAlert={props.showAlert}
            />
          ); //Value of this is defined in NoteItem
        })}
      </div>
    </>
  );
}

export default Notes;
