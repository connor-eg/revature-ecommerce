import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar">
            <span className="navspan"><b><Link to="/">Shop</Link></b></span>
            <span className="navspan"><b><Link to="/cart">Cart</Link></b></span>
            <span className="navspan"><b><Link to="/new">List an item!</Link></b></span>
        </div>
    )
}

export default Navbar;