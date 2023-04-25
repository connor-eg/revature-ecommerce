import { Product } from "../model/Product";
import "./ProductTile.css";

function ProductTile(props: Product){
    return (
        <div className="box leftmargin">
            <img src={props.imageUrl} alt={props.productName + " picture"} />
            <h4>{props.productName}</h4>
            <p>{props.description}</p>
            <p><i>{new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(props.price)}</i></p>
        </div>
    );
}

export default ProductTile;