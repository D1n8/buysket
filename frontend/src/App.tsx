import { useEffect, useState } from "react";
import type { IProduct } from "./components/Product";

function App() {
  const [list, setList] = useState<IProduct[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Получение списка товаров
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
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
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
      const newProduct = await res.json();
      setList((prev) => [...prev, newProduct]);
      setName("");
      setPrice(0);
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
            {item.name} - ${item.price}
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
