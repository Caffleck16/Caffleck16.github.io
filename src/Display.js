import { useOutletContext, useParams, useNavigate } from "react-router-dom";
const Display = () => {
    const [notes, saveData, deleteData] = useOutletContext();
    const { noteID } = useParams();
    const navigate = useNavigate();
    const handleEdit = () => {
        let navPath = "/notes/" + noteID.toString() + "/edit";
        navigate(navPath);
    }

    return ( 
        <div className="notes-section">
            <div className="d-title">
                <div className="title-date">
                    <h1> {notes[noteID].title} </h1>
                    <h6 className="time"> {notes[noteID].date} </h6>
                </div>
                <div className="title-buttons">
                    <div className="btn" onClick= {() => {handleEdit()}}>Edit</div>
                    <div className="btn" onClick= {() => {deleteData(noteID)}}>Delete</div>
                </div>
            </div>
            <div className="content-display" dangerouslySetInnerHTML={{__html: notes[noteID].note}}></div>
        </div>
     );
}
 
export default Display
