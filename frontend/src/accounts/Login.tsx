import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REQUEST_URL } from "../common/defaults";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { set } from "../redux/slices/TokenSlice";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [responseText, setResponseText] = useState("");
    
    return <div className="leftmargin">
        <h1>Log in.</h1>
        <Formik 
        initialValues={{
            userName: '',
            password: ''
        }} 
        onSubmit={values => {
            axios.post<string>(REQUEST_URL + '/users/login', {}, {
                headers: {
                    "username": values.userName,
                    "password": values.password
                }}
            )
            .then(response => {
                setResponseText("Logged in successfully! You should be redirected shortly...");
                dispatch(set(response.data));
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch(err => {
                setResponseText(err.response.data);
            })
        }}>
            <Form>
                <label htmlFor="userName">Username</label>
                <Field id="userName" name="userName"></Field>

                <label htmlFor="password">password</label>
                <Field id="password" name="password"></Field>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
        <p>{responseText}</p>
    </div>
}

export default Login;