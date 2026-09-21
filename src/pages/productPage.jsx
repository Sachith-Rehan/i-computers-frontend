import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";
export default function ProductPage() {

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if(loading) {
                  api.get("/products")
                  .then((response) => {
                        setProducts(response.data);
                        setLoading(false);
                  }).catch((error) => {
                        console.error("Error fetching products:", error);
                        setLoading(false);
                  })
            }
      },[loading]);

      return (
            <div className="w-full min-h-screen bg-primary px-6 py-8">

                  {loading && <LoadingScreen />}

                  {!loading && (
                        <>
                        <div className="mb-8">
                              <h1 className="text-3xl font-bold text-gray-900">
                                    Our Products
                              </h1>

                              <p className="text-gray-500 mt-1">
                                    Explore our latest computer products and accessories
                              </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">

                              {products.map((product) => (
                                    <ProductCard
                                    key={product._id}
                                    product={product}
                                    />
                              ))}

                        </div>
                        </>
                  )}

            </div>
      );
}