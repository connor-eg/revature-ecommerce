import { Field, Form, Formik } from "formik";
import { FormikValues, FormikHelpers } from "formik/dist/types";
import { REQUEST_URL } from "../common/defaults";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set } from "../redux/slices/TokenSlice";

function Register(){
    const dispatch = useDispatch();
    
    return <div className="leftmargin">
        <h1>Register or do not.</h1>
        <Formik 
        initialValues={{
            userName: '',
            password: ''
        }} 
        onSubmit={values => {
            axios.post<string>(REQUEST_URL + '/users/register', {}, {
                headers: {
                    'Accept': 'text/plain',
                    "username": values.userName,
                    "password": values.password
                }}
            )
            .then(response => {
                dispatch(set(response.data));
            })
            .catch(err => {
                console.log(err.toJSON());
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
    </div>
}

export default Register;