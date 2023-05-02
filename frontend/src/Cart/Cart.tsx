import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { REQUEST_URL } from "../common/defaults";
import { ProductOrder } from "../model/ProductOrder";
import ProductTileCart from "../ProductTile/ProductTileCart";

function Cart(){
    const token = useSelector((state: RootState) => state.token.token);
    const [shopItems, setShopItems] = useState<ProductOrder[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);

    function reloadShopScreen() :void {
        //make the axios request for the shop items
        axios.get<ProductOrder[]>(REQUEST_URL + '/cart/', {
            headers:{
                token: token
            }
        })
        .then(response => {
            setShopItems(response.data);
        })
        .catch(err => {
            alert(err.response.data);
        })
    }

    function checkout() :void {
        axios.post<string>(REQUEST_URL + '/cart/checkout', {}, {
            headers:{
                token: token
            }
        })
        .then(response => {
            alert(response.data);
            reloadShopScreen();
        })
        .catch(err => {
            alert(err.response.data);
        })
    }

    useEffect(() => {
        let tcalc = 0;
        shopItems.forEach(element => {
            tcalc += (element.product.price * element.quantity);
        });
        setSubtotal(tcalc);
    }, [shopItems]);

    //This will cause all of the cart items to be loaded on page load.
    useEffect(() => {
        reloadShopScreen();
    }, []);

    const tiles = shopItems.map(item => {
        return <span key={item.product.id}><ProductTileCart callback={reloadShopScreen} {...item} /></span>
    })

    return token === '' ? 
    // Show a screen stating that you need to be logged in if you aren't.
    <div className="leftmargin">
            <h1>You must be logged in to perform that action.</h1>
    </div> : 
    //Show the actual screen if the user is logged in.
    <div className="leftmargin">
        <h1>Your cart</h1>

        {(shopItems.length === 0 &&<span><h3>Your cart is empty.</h3></span>)}

        {(shopItems.length > 0 && <span><h2>Subtotal: {new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(subtotal)}</h2></span>)}
        {(shopItems.length > 0 &&<span><button onClick={checkout}>Checkout items</button></span>)}
        <br /><br />
        <div className="grid">{tiles}</div>
    </div>
}

export default Cart;