import { useState } from "react";
import { Product } from "../model/Product";

function Home() {
    const [shopItems, setShopItems] = useState<Product[] | undefined>(undefined);
    
    return (
        <div>
            <h1>Home page</h1>
            <p>wowzers</p>

        </div>
    );
}

export default Home;