import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";  
import api from "../../utils/api";

import { CiEdit } from "react-icons/ci";
import LoadingScreen from "../../components/loadingScreen";
import ProductDeleteButton from "../../components/productDeleteButton";
export default function AdminProductPage() {
     
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  //load the date forom backend
    useEffect(() => {
      if(loading) {
        const token = localStorage.getItem("token");
        api.get("/products", {
          headers: { 
            Authorization : `Bearer ${token}`
          }
        }).then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
      }  
    },[loading]
    );
    
      
    return (

      <div className = "w-full min-full">

        <div className="w-full min-h-[90px] bg-white shadow-lg rounded-2xl flex items-center justify-between px-6 py-4 border border-gray-100">
  
          <div>
            <p className="text-sm text-gray-500 font-medium">Product Overview</p>
            <h1 className="text-2xl font-bold text-accent mt-1">{products.length} Products</h1>
          </div>

          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent">{products.length}</span>
          </div>

        </div>

        {
          loading && <LoadingScreen />
        }

        <div className="w-full overflow-x-auto mt-6 rounded-2xl shadow-lg border border-gray-200 bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-accent text-white uppercase text-xs">
              <tr className="h-14">
                <th className="px-4 py-3 text-center">Image</th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Labelled Price</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Availability</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.productId} className="bg-white hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-sm" />
                    </div>
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-700">{product.productId}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{product.name}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">Rs. {product.price}</td>
                  <td className="px-4 py-3 text-gray-500 line-through">Rs. {product.labelledPrice}</td>
                  <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{product.model}</td>

                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {product.isAvailable ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold text-gray-700">{product.stock}</td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-5">
                      
                      <Link to="/admin/edit-product" state={product}>
                        <CiEdit className="text-blue-800 hover:text-blue-950 text-xl font-bold cursor-pointer " />
                      </Link>
                      
                      <ProductDeleteButton productId={product.productId} refresh={() => setLoading(true)} />

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      
        
        <div>
          <Link to="/admin/add-product" className= "bg-accent w-[70px] h-[70px] rounded-full flex items-center justify-center text-white text-3xl fixed bottom-6 right-6 ">
            <FaPlus />
          </Link>
        </div>

      </div>
        
        
    )
} 