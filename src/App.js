import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import BlankNote from "./BlankNote";
import Note from "./Note";
import Display from "./Display";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="notes">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element= {<BlankNote />}></Route>
              <Route path="/notes" element= {<BlankNote />}></Route>
              <Route path="/notes/:noteID/edit" element={<Note />}></Route>
              <Route path="/notes/:noteID" element= {<Display />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
