import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import ProductTile from "../ProductTile/ProductTile";
import axios from "axios";
import "./Home.css";

function Home() {
    const [shopItems, setShopItems] = useState<Product[]>([]);

    //This will cause all of the shop items to be loaded on page load.
    //This will use the token from a logged-in user.
    useEffect(() => {
        //make the axios request for the shop items
        axios.get<Product[]>('http://localhost:8081/api/products/')
        .then(response => {
            setShopItems(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    const tiles = shopItems.map(item => {
        return <span key={item.id}><ProductTile {...item} /></span>
    })
    
    return (
        <div className="leftmargin">
            <h1 className="leftmargin">Home page</h1>
            <p className="leftmargin">wowzers</p>
            <div className="grid">{tiles}</div>
        </div>
    );
}

export default Home;