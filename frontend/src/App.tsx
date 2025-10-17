import { useEffect, useState } from "react";
import type { IProduct } from "../src/modules";
import { addProduct, fetchProducts } from "./http/ProductRequests";
import Product from "./components/Product";

function App() {
    const [list, setList] = useState<IProduct[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescr] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    useEffect(() => {
        const loading = async () => {
            const data = await fetchProducts(API_URL);
            setList(data);
        }

        loading();
    }, []);

    const handleAddProduct = async () => {
        const newProduct = await addProduct(API_URL, name, price, description, images);

        setName("");
        setPrice(0);
        setDescr("");
        setImages([]);
        setList((prev) => [...prev, newProduct]);
    };


    return (
        <div style={{ padding: 20 }}>
            <h1>Список товаров</h1>
            <ul>
                {list.map((item =>
                    <Product key={item.id} {...item} />
                ))}
            </ul>

            <h2>Добавить товар</h2>
            <input placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Описание" value={description} onChange={(e) => setDescr(e.target.value)} />
            <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleAddProduct}>Добавить</button>
        </div>
    );
}

export default App;