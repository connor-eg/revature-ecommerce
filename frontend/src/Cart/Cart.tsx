import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../model/Product";
import { REQUEST_URL } from "../common/defaults";
import { ProductOrder } from "../model/ProductOrder";

function Cart(){
    const token = useSelector((state: RootState) => state.token.token);
    const [shopItems, setShopItems] = useState<ProductOrder[]>([]);

    //This will cause all of the cart items to be loaded on page load.
    useEffect(() => {
        //make the axios request for the shop items
        axios.get<ProductOrder[]>(REQUEST_URL + '/products/')
        .then(response => {
            setShopItems(response.data);
        })
        .catch(err => {
            console.log(err);
            alert(err.response.data);
        })
    }, []);

    return token === '' ? 
    // Show a screen stating that you need to be logged in if you aren't.
    <div className="leftmargin">
            <h1>You must be logged in to perform that action.</h1>
    </div> : 
    //Show the actual screen if the user is logged in.
    <div>
        <h1>Your cart</h1>
    </div>
}

export default Cart;