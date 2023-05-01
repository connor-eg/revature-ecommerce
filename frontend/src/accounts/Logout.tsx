import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../redux/slices/TokenSlice";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(reset());

        setTimeout(() => {
            navigate("/");
        }, 2000);
    }, [])
    
    
    return <div className="leftmargin">
        <h2>You have been logged out.</h2>
        <p>You will be redirected momentarily...</p>
    </div>
}

export default Logout;