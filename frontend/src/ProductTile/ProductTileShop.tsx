import { useSelector } from "react-redux";
import { NO_IMAGE_ICON, REQUEST_URL } from "../common/defaults";
import { Product } from "../model/Product";
import "./ProductTile.css";
import { RootState } from "../redux/store";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import axios from "axios";

//This is the version of ProductTile that is displayed on the shop page.
//It shows a button that allows the user, when they are logged in, to add a product to their cart.
function ProductTileShop(props: Product){
    const token = useSelector((state: RootState) => state.token.token);

    return (
        <div className="box leftmargin">
            <center>
            <img src={props.imageUrl === '' ? NO_IMAGE_ICON : props.imageUrl} alt={props.productName + " picture"} />
            </center>
            <h4>{props.productName}</h4>
            <p>{props.description}</p>
            <p><i>{new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(props.price)}</i></p>
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
                            "itemId": props.id,
                            "quantity": values.quantity
                        }}
                    )
                    .then(response => {
                        console.log(response.data);
                        alert("Item was added to the cart");
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

export default ProductTileShop;