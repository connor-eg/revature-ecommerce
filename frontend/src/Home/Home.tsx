import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import ProductTile from "../ProductTile/ProductTile";

function Home() {
    const [shopItems, setShopItems] = useState<Product[] | undefined>(undefined);

    //This will cause all of the shop items to be loaded on page load.
    //This will use the token from a logged-in user.
    useEffect(() => {
        if(shopItems !== undefined) return; //Disallow shopitems from updating more than once.
    });
    
    
    return (
        <div>
            <h1 className="leftmargin">Home page</h1>
            <p className="leftmargin">wowzers</p>
            <ProductTile id={0} productName={"Banana Bandana"} description={"A bandana with pictures of bananas on it."} price={460.22} imageUrl={"https://cdn1.bigcommerce.com/n-63unu/x9ix869/products/221/images/471/FullSizeRender_22__49138.1436347863.386.513.jpg?c=2"}/>
        </div>
    );
}

export default Home;