import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="bar">
            <span className="leftmargin"><b><Link to="/">Shop</Link></b></span>
            <span className="leftmargin"><b><Link to="/cart">Cart</Link></b></span>
            <span className="leftmargin"><b><Link to="/new">List an item!</Link></b></span>
        </div>
    )
}

export default Navbar;