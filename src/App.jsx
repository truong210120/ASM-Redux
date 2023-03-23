import { Routes,Route } from "react-router-dom"
import ProductAdd from "./component/ProductAdd"
import Product from "./component/Product"
import ProductEdit from "./component/ProductUpdate"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Product/>}/>
      <Route path="/add" element={<ProductAdd/>}/>
      <Route path="/edit/:id" element={<ProductEdit/>}/>
    </Routes>
  )
}

export default App
