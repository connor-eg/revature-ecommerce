import { Field, Form, Formik } from "formik";
import { FormikValues, FormikHelpers } from "formik/dist/types";
import { REQUEST_URL } from "../common/defaults";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set } from "../redux/slices/TokenSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [responseText, setResponseText] = useState("");
    
    return <div className="leftmargin">
        <h1>Register for an account.</h1>
        <Formik 
        initialValues={{
            userName: '',
            password: ''
        }}
        onSubmit={values => {
            axios.post<string>(REQUEST_URL + '/users/register', {}, {
                headers: {
                    "username": values.userName,
                    "password": values.password
                }}
            )
            .then(response => {
                setResponseText("Account registered! You should be redirected shortly...");
                setTimeout(() => {
                    navigate("/login");
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

export default Register;