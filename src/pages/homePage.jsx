import { Routes, Route } from "react-router-dom";  
import  Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverViewPage from "./productOverViewPage";
export default function HomePage() {
  return (
    <div>
      <Header />
  
      <div className="w-full h-[calc(100vh-100px)] bg-white">
          <Routes>
            <Route path="/" element={<p>Home Page</p>}/>
            <Route path="/products" element={<ProductPage/>}/>
            <Route path="/contact-us" element={<p>contact-us</p>}/>
            <Route path="/about-us" element={<p>about-us</p>}/>
            <Route path="/cart" element={<p>cart</p>}/>
            <Route path="/overview/:productId" element={<ProductOverViewPage/>}/>
            <Route path="/*" element={<p>404 page</p>}/>
          </Routes>
      </div>
    </div>

  )
}