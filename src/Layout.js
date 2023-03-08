import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("data");
        const savedValue = JSON.parse(saved);
        console.log(savedValue);
        return savedValue || [{isNull:true}];
    })
    useEffect (() => {
        if (location == "") {
            navigate("/notes");
        }
  }, []);
    const [side, setSide] = useState(1);
    const deleteData = (id) => {
        console.log("delete called");
        let i = notes;
        i.splice(id, 1);
        if (i.length == 0) {
            i[0] = {isNull:true};
            setNotes(i)
            navigate("/notes")

        }
        setNotes(i);
        navigate("/notes");
        console.log("stored");
        localStorage.setItem('data', JSON.stringify(notes))
    }
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };
    const saveData = (title, date, note, noteID) => {
  
        let i = notes;
        i[noteID].title = title;
        i[noteID].time = date;
        i[noteID].date = formatDate(date);
        console.log(note);
        if (Object.keys(note).length != 0) {
            i[noteID].note = note;
            i[noteID].desc = (note.substring(0,50)).replace(/(<([^>]+)>)/ig, "") + "...";
        }
        setNotes(i);
        console.log(i);
        
        let navPath = "/notes/" + noteID.toString();
        console.log("stored");
        localStorage.setItem('data', JSON.stringify(notes))
        navigate(navPath);
    }
    const handleNew = () => {
        let newNotes = notes;
        let newID = uuidv4();
        console.log(notes);
        if (notes[0].isNull === true) {
            newNotes[0] = {title:"Untitled", time:"", desc:"...", note:"", date:"", id:newID};
            setNotes(newNotes);
            let navPath = "/notes/" + 0 + "/edit";
            navigate(navPath);
        } else {
            newNotes = notes;
            let id = newNotes.length;
            newNotes[id] = {title:"Untitled", time:"", desc:"...", note:"", date:"", id:newID};
            setNotes(newNotes);
            let navPath = "/notes/" + id + "/edit";
            navigate(navPath);
        }
    }
    const handleClickSide = () => {
        if (side === 1) {
            setSide(0);
        } else {
            setSide(1);
        }
    }

    return (
        <>
            <div className="navbar">
                <button onClick={ handleClickSide }>&#9776;</button>
                <div>
                    <h1>Lotion</h1>
                    <p>Like Notion, but worse.</p>
                </div>
                <div>
                </div>
            </div>
            <div className="home">
                <Sidebar side = {side} handleNew = {handleNew} notes = {notes}/>
                <Outlet context={[notes, saveData, deleteData]} />
            </div>
        </>
     );
}
 
export default Layout;
