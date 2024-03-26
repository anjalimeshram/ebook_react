import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext1 from "../context/noteContext1";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext1);
  const { notes, getNote, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  useEffect(() => {
    getNote();
  }, []);
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const clickhere = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    //e-event
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Open modal
      </button>

      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">update notes</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter title"
                    name="title"
                    onChange={onChange}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    placeholder="Enter tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={clickhere}
              >
                updateNote
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>My Notes</h1>
        {notes.map((note) => {
          //return note.title ;
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
