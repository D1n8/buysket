export interface IProduct{
    id: number,
    name: string,
    price: number
}

function Product(props: IProduct){
    return (
    <div className="product">
        <p>{props.name}</p>
    </div>);
}

export default Product;