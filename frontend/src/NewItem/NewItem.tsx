import axios from "axios";
import { Field, Form, Formik } from "formik";
import { REQUEST_URL } from "../common/defaults";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function NewItem(){
    const token = useSelector((state: RootState) => state.token.token);
    const [responseText, setResponseText] = useState("");
    
    return token === '' ?
        // Handling if the user tries to do this without being logged in
        <div className="leftmargin">
            <h1>You must be logged in to perform that action.</h1>
        </div> 
        :
        //If the user is logged in we display the form as normal
        <div className="leftmargin">
        <h1>List an item for sale.</h1>
        <Formik 
        initialValues={{
            productName: '',
            description: '',
            price: 0,
            imageUrl: ''
        }}
        onSubmit={values => {
            if(values.productName === ''){
                setResponseText("The product must have a name.");
                return;
            }
            if(values.description === ''){
                setResponseText("The product must have a description.");
                return;
            }
            axios.post<string>(REQUEST_URL + '/products/', {}, {
                headers: {
                    "token": token,
                    "productName": values.productName,
                    "description": values.description,
                    "price": values.price,
                    "imageUrl": values.imageUrl
                }}
            )
            .then(response => {
                setResponseText(response.data);
            })
            .catch(err => {
                setResponseText(err.response.data);
            })
        }}>
            <Form>
                <label htmlFor="productName">Product name </label>
                <Field id="productName" name="productName"></Field><br />

                <label htmlFor="description">Description </label>
                <Field as="textarea" id="description" name="description"></Field><br />

                <label htmlFor="price">Price </label>
                <Field type="number" id="price" name="price" min="0" step="0.01"></Field><br />

                <label htmlFor="imageUrl">Image URL (optional) </label>
                <Field id='imageUrl' name='imageUrl'></Field>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
        <p>{responseText}</p>
    </div>
}

export default NewItem;