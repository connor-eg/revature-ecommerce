import { Product } from "../model/Product";
import "./ProductTile.css";

function ProductTile(props: Product){
    return (
        <div className="box">
            <img src={props.imageUrl} alt={props.productName + " picture"} />
            <h4>{props.productName}</h4>
            <p>{props.description}</p>
            <p><i>{props.price}</i></p>
        </div>
    );
}

export default ProductTile;