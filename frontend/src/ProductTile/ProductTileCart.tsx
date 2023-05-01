import { useSelector } from "react-redux";
import { NO_IMAGE_ICON, REQUEST_URL } from "../common/defaults";
import "./ProductTile.css";
import { RootState } from "../redux/store";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import axios from "axios";
import { ProductOrder } from "../model/ProductOrder";

//This is the version of ProductTile that is displayed on the cart page.
//It shows an "update quantity" button, as well as a "remove from cart" button.
//It also displays the currently ordered quantity of an item.

function ProductTileCart(props: ProductOrder){
    const token = useSelector((state: RootState) => state.token.token);

    function removeItem(id: number){
        axios.post<string>(REQUEST_URL + '/cart/', {}, {
            headers: {
                "token": token,
                "itemId": props.product.id,
                "quantity": 0
            }}
        )
        .then(response => {
            console.log(response.data);
            alert("Item was removed.");
        })
        .catch(err => {
            console.log(err);
            alert("Item was not removed from the cart:\n" + err.response.data);
        })
    }

    return (
        <div className="box leftmargin">
            <center>
            <img src={props.product.imageUrl === '' ? NO_IMAGE_ICON : props.product.imageUrl} alt={props.product.productName + " picture"} />
            </center>
            <h4>{props.product.productName}</h4>
            <p>{props.product.description}</p>
            <p><i>{new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(props.product.price)}</i></p>
            {(token !== '' && <center>
                <Formik initialValues={{
                    quantity: 1
                }}
                onSubmit={values => {
                    if(values.quantity < 1){
                        return;
                    }
                    axios.post<string>(REQUEST_URL + '/cart/', {}, {
                        headers: {
                            "token": token,
                            "itemId": props.product.id,
                            "quantity": values.quantity
                        }}
                    )
                    .then(response => {
                        console.log(response.data);
                        alert("Quantity was updated");
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Item was not added to the cart:\n" + err.response.data);
                    })
                }}>
                    <Form>
                        <label htmlFor="quantity">Quantity</label>
                        <Field type="number" id="quantity" name="quantity" min="1" step="1"></Field>

                        <button type="submit">Add to cart</button>
                    </Form>
                </Formik><br />
            </center>)}
            <br/>
        </div>
    );
}

export default ProductTileCart;