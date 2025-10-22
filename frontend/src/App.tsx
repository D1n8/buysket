import { useEffect, useState } from "react";
import type { IProduct, ICategory } from "../src/modules";
import { addProduct, fetchProducts } from "./http/ProductRequests";
import Product from "./components/Product";
import { addCategory, fetchCategory } from "./http/CategoryRequests";

function App() {
    const [listProducts, setListProducts] = useState<IProduct[]>([]);
    const [listCategories, setListCategories] = useState<ICategory[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescr] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const [categoryName, setCategoryName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>();

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    useEffect(() => {
        const loading = async () => {
            setListProducts(await fetchProducts(API_URL));
            setListCategories(await fetchCategory(API_URL));
        }

        loading();
    }, [listProducts, listCategories]);

    const handleAddProduct = async () => {
        await addProduct(API_URL, name, price, description, images, selectedCategory);

        setName("");
        setPrice(0);
        setDescr("");
        setImages([]);
    };

    const handleAddCategory = async () => {
        await addCategory(API_URL, categoryName);
        setCategoryName("");
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Список товаров</h2>
            <ul>
                {listProducts.map((item =>
                    <Product key={item.id} {...item} />
                ))}
            </ul>

            <h3>Добавить товар</h3>
            <input placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Описание" value={description} onChange={(e) => setDescr(e.target.value)} />
            <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))}>
                {
                    listCategories.map((cat => (
                        <option value={cat.id}>{cat.name}</option>
                    )))
                }
            </select>

            <input type="file" multiple onChange={handleFileChange} accept=".png, .jpeg, .jpg"/>

            <button onClick={handleAddProduct}>Добавить</button>

            <h2>Список категорий</h2>
            <ul>
                {
                    listCategories.map((cat => (
                        <li>{cat.name}</li>
                    )))
                }
            </ul>
            <h3>Добавить категорию</h3>
            <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Название категории"/>
            <button onClick={handleAddCategory}>Добавить</button>
        </div>
    );
}

export default App;