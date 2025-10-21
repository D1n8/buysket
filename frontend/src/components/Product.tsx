import { useState } from "react";
import { deleteProduct } from "../http/ProductRequests";
import type { IProduct } from "../modules";
import { DeclinationRubles } from "../utils/utils";
import ConfirmModal from "./modals/ConfirmModal";
const API_URL = import.meta.env.VITE_API_URL;

function Product(props: IProduct){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmitDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            deleteProduct(API_URL, props.id);
            setModalIsOpen(false);
        } catch (error) {
            console.log(error);
        }
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
        <button onClick={() => setModalIsOpen(true)}>удалить</button>
        <ConfirmModal question="Вы точно хотите удалить этот товар?" isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} handleSubmit={(e) => handleSubmitDelete(e)}></ConfirmModal>
    </div>);
}

export default Product;