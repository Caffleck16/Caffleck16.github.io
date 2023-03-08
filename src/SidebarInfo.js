import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const SidebarInfo = ({ notes }) => {
    const { noteID } = useParams();
    const [ j, setIDLookup ] = useState(() => {
        console.log(notes);
        if (notes.hasOwnProperty('IsNull')) {
            return [];
        } else {
            let j = [];
            for (let i = 0; i < notes.length; i++) {
                j[i] = notes[i].id;
            }
            return j;
        }
    });
    let navigate = useNavigate();
    const handleSelection = (id, max) => {
        let j = [];
            for (let i = 0; i < notes.length; i++) {
                j[i] = notes[i].id;
            }
        setIDLookup(j);
        console.log(j);
        console.log(j);
        for (let i = 0; i < max; i++) {

            let clr = document.getElementById(j[i]);
            if (clr.classList.contains("current-info")) {
                clr.classList.remove("current-info");
            }
        }
        console.log(id + " clicked");
        let obj = document.getElementById(id);
        obj.classList.add("current-info");
        let pathID = 0;
        for (let i = 0; i < max; i++) {
            if (j[i] == id) {
                pathID = i;
            }
        }
        let navPath = "/notes/" + pathID;
        navigate(navPath);
    }
    console.log(notes);
    if (notes[0] == undefined || notes[0].isNull == true) {
        return ( 
            <p>No Note Yet</p>
         );
    } else if(notes) {
        console.log(notes);
        return (
            <>
                {notes.map((note) => {
                    if (noteID && note.id == notes[noteID].id) {
                            return <div className="info current-info" key={note.id} id={note.id} onClick= {() => {handleSelection(note.id, notes.length)}}>
                            <h2 className= "side-subtitle"> { note.title } </h2>
                            <h6 className= "side-date"> { note.date } </h6>
                            <p className= "side-desc"> { note.desc } </p>
                    </div> 
                    } 
        
                   return <div className="info" key={note.id} id={note.id} onClick= {() => {handleSelection(note.id, notes.length)}}>
                        <h2 className= "side-subtitle"> { note.title } </h2>
                        <h6 className= "side-date"> { note.date } </h6>
                        <p className= "side-desc"> { note.desc } </p>
                    </div>
    })}
            </>
        );
    } else {
        <p>No note yet</p>
    }
}
 
export default SidebarInfo;