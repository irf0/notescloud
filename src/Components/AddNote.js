import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ id: "", title: "", description: "", tag: "" }); //Input fields become Blank after clicking the button 'Add Note'
    props.showAlert("Noted Added!", "success");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={note.title}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            value={note.description}
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-success"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
