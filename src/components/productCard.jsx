import getFormattedPrice from "../utils/priceFormatter";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    const imageUrl =
        product.images?.[0]?.url ||
        product.images?.[0] ||
        "/placeholder.png";

    const discount =
        product.labelledPrice > product.price
            ? Math.round(
                ((product.labelledPrice - product.price) /
                    product.labelledPrice) *
                    100
              )
            : 0;

    const isAvailable =
        product.isAvailable === true &&
        Number(product.stock) > 0;


    return (
        <div className="group w-full max-w-[280px] h-[520px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">

            {/* Product Image */}
            <div className="relative h-[220px] bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">

                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Discount */}
                {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {discount}% OFF
                    </span>
                )}

                {/* Availability */}
                {!isAvailable && (
                    <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                        Out of Stock
                    </span>
                )}

            </div>


            {/* Product Details */}
            <div className="p-5 flex flex-col flex-1">

                {/* Category */}
                {product.category && (
                    <p className="text-xs font-semibold text-accent uppercase mb-1">
                        {product.category}
                    </p>
                )}


                {/* Product Name */}
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[56px]">
                    {product.name}
                </h2>


                {/* Short Description */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                </p>


                {/* Bottom Section */}
                <div className="mt-auto">

                    {/* Price */}
                    {/* Price */}
                    <div className="flex flex-col">

                        <span className="text-xl font-bold text-accent">
                            {getFormattedPrice(product.price)}
                        </span>

                        {product.labelledPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through mt-1">
                                {getFormattedPrice(product.labelledPrice)}
                            </span>
                        )}

                    </div>


                    {/* Button */}
                    <Link
                        to={ `/overview/${product.productId}` }
                        onClick={(e) => {
                            if (!isAvailable) {
                                e.preventDefault();
                            }
                        }}
                        className={`w-full mt-5 py-2.5 rounded-xl font-semibold text-center block transition ${
                            isAvailable
                                ? "bg-accent text-white hover:opacity-90"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {isAvailable ? "View Product" : "Out of Stock"}
                    </Link>

                </div>

            </div>

        </div>
    );
}