import type { IProduct } from "./components/Product"

const MockProducts: IProduct[] = [
  { id: 1, name: "Товар 1"},
  { id: 2, name: "Товар 2"}
]

function App() {
  const list: IProduct[] = MockProducts
  return (
    <ul>
      {list.map((item) => (<li>{item.name}</li>))}
    </ul>
  )
}

export default App
