import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import ProductTileShop from "../ProductTile/ProductTileShop";
import axios from "axios";
import "./Home.css";
import { REQUEST_URL } from "../common/defaults";

function Home() {
    const [shopItems, setShopItems] = useState<Product[]>([]);

    //This will cause all of the shop items to be loaded on page load.
    useEffect(() => {
        //make the axios request for the shop items
        axios.get<Product[]>(REQUEST_URL + '/products/')
        .then(response => {
            setShopItems(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    const tiles = shopItems.map(item => {
        return <span key={item.id}><ProductTileShop {...item} /></span>
    })
    
    return (
        <div className="leftmargin">
            <h1 className="leftmargin">Welcome to the shop!</h1>
            <div className="grid">{tiles}</div>
        </div>
    );
}

export default Home;