import type { IProduct } from "../modules";


function Product(props: IProduct){
    return (
    <div className="product">
        <p>{props.name}</p>
    </div>);
}

export default Product;