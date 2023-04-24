import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <span><Link to="/">Shop</Link> </span>
            <span><Link to="/cart">Cart</Link> </span>
        </div>
    )
}

export default Navbar;