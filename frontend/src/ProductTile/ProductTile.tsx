import { NO_IMAGE_ICON } from "../common/defaults";
import { Product } from "../model/Product";
import "./ProductTile.css";

function ProductTile(props: Product){
    function handleClick(){
        console.log("bimgus");
    }

    return (
        <div className="box leftmargin">
            <img src={props.imageUrl === '' ? NO_IMAGE_ICON : props.imageUrl} alt={props.productName + " picture"} />
            <h4>{props.productName}</h4>
            <p>{props.description}</p>
            <p><i>{new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(props.price)}</i></p>
            
            <center><button onClick={handleClick}>Add to cart</button></center>
            <br/>
        </div>
    );
}

export default ProductTile;