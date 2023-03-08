import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
const Note = () => {
    const [notes, saveData, deleteData] = useOutletContext();
    console.log(notes);
    const nav = useNavigate();
    const { noteID } = useParams();
    useEffect (() => {
        if (noteID >= notes.length) {
            nav("/notes");
        }
    })
    const [titleVal, setTitleVal] = useState(notes[noteID].title || "Untitled");
    const [dateVal, setDateVal] = useState(notes[noteID].time);
    const [noteVal, setNoteVal] = useState(notes[noteID].note);
    const [currNote, setCurrNote] = useState({});
    useEffect (() => {
        setTitleVal(notes[noteID].title);
        setDateVal(notes[noteID].time);
        setCurrNote(notes[noteID].note);
    }, [noteID])  
    useEffect (() => {
        setNoteVal(currNote);
      }, [currNote])
    const handleChange = (e) => {
            setTitleVal(e.target.value);
        }
    const handleDateChange = (e) => {
        setDateVal(e.target.value);
    }
    let titleID = "title" + "-" + noteID.toString();
    console.log(titleID);
    console.log(titleVal);
    return (
        <div key= { titleID } className="notes-section">
            <div className="title">
                <div className="title-date">
                    <input type="text" className="title-input" defaultValue={ notes[noteID].title || "Untitled"} onChange= {(e) => handleChange(e)}/>
                    <input type="datetime-local" defaultValue= { notes[noteID].time || "datetime-local"} className="date-title" onChange= {(e) => handleDateChange(e)}/>
                </div>
                <div className="title-buttons">
                    <div className="btn" onClick= {() => {saveData(titleVal, dateVal, noteVal, noteID)}}>Save</div>
                    <div className="btn" onClick= {() => {deleteData(noteID)}}>Delete</div>
                </div>
            </div>
            <div className="editor">
                <ReactQuill theme="snow" placeholder="Your Note Here" defaultValue={ notes[noteID].note || "" } onChange= {setCurrNote} />
            </div>
        </div>
     );
    } 

export default Note;