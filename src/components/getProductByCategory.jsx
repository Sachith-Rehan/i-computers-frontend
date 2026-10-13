
import api from "../utils/api";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";

export default function GetProductByCategory({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/products/category/${encodeURIComponent(category)}`)
      .then((response) => {
        console.log("Products received:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div className="w-full py-10">
      <h2 className="text-2xl font-bold mb-6">
        {category}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
