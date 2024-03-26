import React, { useState } from "react";
import NoteContext from "./noteContext1";

const NoteState = (props) => {
  const host = "http://localhost:3002"; //connection
  const notesInital = [];

  const [notes, setNotes] = useState(notesInital);

  //fetch all notes from database

  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      //body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //add notes
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json({ title, description, tag });
    console.log(json);
    console.log("adding new note");

    const note = {
      _id: "65eeb11f6260dd6786a4fdc4",
      user: "65e82fc147c00ef6c2b9ce35",
      title: title,
      description: description,
      tag: tag,
      date: "2024-03-11T07:22:07.875Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("deleteting notes" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //edit with api database

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    var newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes);
    }
  };

  return (
    <div>
      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, getNote, editNote }}
      >
        {props.children}
      </NoteContext.Provider>
    </div>
  );
};

export default NoteState;
