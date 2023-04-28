import { Link } from "react-router-dom";
import "./LoginBar.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function LoginBar(){
    const token = useSelector((state: RootState) => state.token.token);

    return <div className="loginbar">
        {(token === '' && <span className="loginspan"><b><Link to="/register">Register</Link></b></span>)}
        {(token === '' && <span className="loginspan"><b><Link to="/login">Log in</Link></b></span>)}
        {(token !== '' && <span className="loginspan"><b><Link to="/logout">Log out</Link></b></span>)}
    </div>
}