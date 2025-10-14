import { useEffect, useState } from "react";
import type { IProduct } from "../src/modules";

function App() {
  const [list, setList] = useState<IProduct[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescr] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Получение списка товаров
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Добавление нового товара
  const addProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description }),
      });
      const newProduct = await res.json();
      setList((prev) => [...prev, newProduct]);
      setName("");
      setPrice(0);
      setDescr("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Список товаров</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} р - {item.description}
          </li>
        ))}
      </ul>

      <h2>Добавить товар</h2>
      <input
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescr(e.target.value)}
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button onClick={addProduct}>Добавить</button>
    </div>
  );
}

export default App;
