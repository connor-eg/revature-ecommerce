import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
