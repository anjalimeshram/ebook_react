import React, {useContext} from 'react';
import noteContext1 from '../context/noteContext1';

const NoteItem = (props) => {
    const context=useContext(noteContext1);
const {deleteNote}=context;
const {note,updateNote}=props;
  return (
    <div className='col-md-3'>
      <div className="card">
    <div className="card-body">
      <h4 className="card-title">{note.title}</h4>
      <p className="card-text">{note.description}</p>
      <p className="card-text">{note.tag}</p>
      <button onClick={()=>{deleteNote(note._id)}}>Delete</button>
      <button onClick={()=>{updateNote(note)}}>Update</button>
  </div>
  </div>
    </div>
  );
};

export default NoteItem
