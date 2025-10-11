import { useEffect, useState } from "react";
import type { IProduct } from "./components/Product"

function App() {
  const [list, setList] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(req => req.json())
      .then(data => setList(data))
      .catch(error => console.log(error));
  }, [])

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
        ))}
    </ul>
  )
}

export default App
