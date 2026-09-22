import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FiArrowLeft,
    FiShoppingCart,
    FiCheckCircle,
    FiXCircle
} from "react-icons/fi";

import LoadingScreen from "../components/loadingScreen";
import ProductImageSlideShow from "../components/productImageSlideShow";
import getFormattedPrice from "../utils/priceFormatter";
import api from "../utils/api";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import { showErrorToast, showSuccessToast } from "../utils/toast";

export default function ProductOverViewPage() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        if (!productId) {
            navigate("/products");
            return;
        }

        api.get("/products/" + productId)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                navigate("/products");
            });

    }, [productId, navigate]);


    if (product == null) {
        return <LoadingScreen />;
    }


    const isAvailable =
        product.isAvailable === true &&
        Number(product.stock) > 0;


    const discount =
        product.labelledPrice > product.price
            ? Math.round(
                ((product.labelledPrice - product.price) /
                    product.labelledPrice) *
                    100
            )
            : 0;


    return (
        <div className="w-full min-h-full bg-white">

            <div className="max-w-[1400px] mx-auto px-6 py-8">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-2 text-gray-500 hover:text-accent transition mb-6"
                >
                    <FiArrowLeft size={20} />

                    <span className="font-medium">
                        Back to Products
                    </span>
                </button>


                {/* Main Product Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* LEFT SIDE - Images */}
                    <div className="w-full flex justify-center items-start">

                        <ProductImageSlideShow
                            images={product.images}
                        />

                    </div>


                    {/* RIGHT SIDE - Product Information */}
                    <div className="w-full flex flex-col">

                        {/* Category */}
                        {product.category && (
                            <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                                {product.category}
                            </p>
                        )}


                        {/* Product Name */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                            {product.name}
                        </h1>


                        {/* Brand and Model */}
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">

                            {product.brand && (
                                <p>
                                    Brand:
                                    <span className="font-semibold text-gray-700 ml-1">
                                        {product.brand}
                                    </span>
                                </p>
                            )}

                            {product.model && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>

                                    <p>
                                        Model:
                                        <span className="font-semibold text-gray-700 ml-1">
                                            {product.model}
                                        </span>
                                    </p>
                                </>
                            )}

                        </div>


                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 my-6"></div>


                        {/* Price */}
                        <div>

                            <div className="flex items-center gap-3 flex-wrap">

                                <span className="text-3xl font-bold text-accent">
                                    {getFormattedPrice(product.price)}
                                </span>

                                {discount > 0 && (
                                    <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                                        {discount}% OFF
                                    </span>
                                )}

                            </div>


                            {/* Labelled Price */}
                            {product.labelledPrice > product.price && (
                                <p className="text-gray-400 line-through mt-2">
                                    {getFormattedPrice(product.labelledPrice)}
                                </p>
                            )}

                        </div>


                        {/* Availability */}
                        <div className="mt-6">

                            {isAvailable ? (

                                <div className="flex items-center gap-2 text-green-600">
                                    <FiCheckCircle size={20} />

                                    <span className="font-semibold">
                                        In Stock
                                    </span>
                                </div>

                            ) : (

                                <div className="flex items-center gap-2 text-red-500">
                                    <FiXCircle size={20} />

                                    <span className="font-semibold">
                                        Out of Stock
                                    </span>
                                </div>

                            )}

                        </div>


                        {/* Description */}
                        <div className="mt-7">

                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Product Description
                            </h2>

                            <p className="text-gray-500 leading-7">
                                {product.description}
                            </p>

                        </div>


                        {/* Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">

                            <button
                                disabled={!isAvailable}
                                className={`flex-1 h-[52px] rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                                    isAvailable
                                        ? "bg-accent text-white hover:opacity-90"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}

                                onClick={() => {
                                    const success = addToCart(product, 1);
                                    if(success){
                                        showSuccessToast("Product added successfully!")
                                    }else{
                                        showErrorToast("Unable to add product!")
                                    }
                                }}
                            >
                                <FiShoppingCart size={20} />

                                {isAvailable
                                    ? "Add to Cart"
                                    : "Out of Stock"
                                }

                            </button>


                            {isAvailable && (
                                <Link to="/checkout" state={[
                                    {
                                        product: {
                                            productId : product.productId,
                                            name : product.name,
                                            image: product.images[0],
                                            price : product.price,
                                            labelledPrice : product.labelledPrice
                                        }, 
                                        qty : 1
                                    }
                                ]}
                                     className="flex-1 h-[52px] rounded-xl font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-white transition flex items-center justify-center"
                                >
                                    Buy Now
                                </Link>
                            )}

                        </div>


                        {/* Small Product Info */}
                        <div className="mt-8 bg-gray-50 rounded-xl p-4">

                            <div className="flex justify-between text-sm py-2">

                                <span className="text-gray-500">
                                    Product ID
                                </span>

                                <span className="font-medium text-gray-700">
                                    {product.productId}
                                </span>

                            </div>


                            {product.brand && (
                                <div className="flex justify-between text-sm py-2 border-t border-gray-200">

                                    <span className="text-gray-500">
                                        Brand
                                    </span>

                                    <span className="font-medium text-gray-700">
                                        {product.brand}
                                    </span>

                                </div>
                            )}


                            {product.model && (
                                <div className="flex justify-between text-sm py-2 border-t border-gray-200">

                                    <span className="text-gray-500">
                                        Model
                                    </span>

                                    <span className="font-medium text-gray-700">
                                        {product.model}
                                    </span>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}