import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="bgcolor">
            <span className="leftmargin"><Link to="/">Shop</Link> </span>
            <span className="leftmargin"><Link to="/cart">Cart</Link> </span>
            <span className="leftmargin"><Link to="/new">List an item!</Link> </span>
        </div>
    )
}

export default Navbar;