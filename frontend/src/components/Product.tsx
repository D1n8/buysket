import { deleteProduct } from "../http/ProductRequests";
import type { IProduct } from "../modules";
import { DeclinationRubles } from "../utils/utils";
const API_URL = import.meta.env.VITE_API_URL;

function Product(props: IProduct){
    const onDelete = async () => {
        deleteProduct(API_URL, props.id);
    }

    return (
    <div className="product">
        <p><b>{props.name}</b></p>
        <p>{props.description}</p>
        <p>{props.price} {DeclinationRubles(props.price)}</p>
        {
            props.images && props.images.length > 0 ? (
                props.images.map(image => 
                    <img width={200} src={`${API_URL}${image}`} alt="Фото товара" />
                )
            )
            : 
            (
                <p>Изображение не загружено</p>
            )
        }
        <button onClick={onDelete}>удалить</button>
    </div>);
}

export default Product;