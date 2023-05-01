import { BrowserRouter, Routes, Route, Link, createBrowserRouter } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import { LoginBar } from "./accounts/LoginBar";
import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Logout from "./accounts/Logout";
import NewItem from "./NewItem/NewItem";
import Cart from "./Cart/Cart";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="topbars">
          <LoginBar />
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/new" element={<NewItem />}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
