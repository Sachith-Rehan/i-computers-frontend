import { useState } from "react";
import getCart, { getTotal } from "../utils/cart";
import getFormattedPrice from "../utils/priceFormatter";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";

import { useLocation } from "react-router-dom";

export default function CheckoutPage() {

    const location = useLocation();

    // If location.state doesn't exist, use saved cart
    const data = location.state || getCart();

    const [cart, setCart] = useState(data);


    // Decrease quantity
    const decreaseQuantity = (index) => {

        const newQty = cart[index].qty - 1;

        if (newQty > 0) {

            const newCart = cart.map((item, currentIndex) => {

                if (currentIndex === index) {
                    return {
                        ...item,
                        qty: newQty
                    };
                }

                return item;
            });

            setCart(newCart);
        }
    };


    // Increase quantity
    const increaseQuantity = (index) => {

        const newCart = cart.map((item, currentIndex) => {

            if (currentIndex === index) {
                return {
                    ...item,
                    qty: item.qty + 1
                };
            }

            return item;
        });

        setCart(newCart);
    };


    const total = getTotal(cart);


    return (
        <div className="w-full min-h-full bg-gray-100 px-4 py-8">

            <div className="max-w-[1100px] mx-auto">


                {/* Page Header */}
                <div className="mb-7">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Checkout
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Review your order before confirming
                    </p>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-7">


                    {/* PRODUCTS */}
                    <div className="flex flex-col gap-4">

                        {cart.map((cartItem, index) => (

                            <div
                                key={cartItem.product.productId}
                                className="bg-white min-h-[170px] rounded-2xl p-5 border border-gray-200 shadow-sm flex gap-5"
                            >

                                {/* Product Image */}
                                <div className="w-[130px] h-[130px] bg-gray-50 rounded-xl flex items-center justify-center shrink-0">

                                    <img
                                        src={cartItem.product.image}
                                        alt={cartItem.product.name}
                                        className="w-full h-full object-contain p-3"
                                    />

                                </div>


                                {/* Product Information */}
                                <div className="flex-1 flex flex-col">

                                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {cartItem.product.name}
                                    </h2>


                                    {/* Prices */}
                                    <div className="mt-2">

                                        {cartItem.product.labelledPrice >
                                            cartItem.product.price && (

                                            <p className="text-sm text-gray-400 line-through">
                                                {getFormattedPrice(
                                                    cartItem.product.labelledPrice
                                                )}
                                            </p>
                                        )}

                                        <p className="text-lg font-bold text-accent">
                                            {getFormattedPrice(
                                                cartItem.product.price
                                            )}
                                        </p>

                                    </div>


                                    {/* Bottom Section */}
                                    <div className="mt-auto flex items-center justify-between">


                                        {/* Quantity Controller */}
                                        <div className="h-[38px] border border-gray-300 rounded-full flex items-center overflow-hidden">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(index)
                                                }
                                                disabled={cartItem.qty <= 1}
                                                className={`w-10 h-full flex items-center justify-center transition ${
                                                    cartItem.qty <= 1
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : "text-gray-600 hover:bg-gray-100 hover:text-accent"
                                                }`}
                                            >
                                                <FaMinus size={12} />
                                            </button>


                                            <span className="w-10 text-center text-sm font-semibold text-gray-800">
                                                {cartItem.qty}
                                            </span>


                                            <button
                                                onClick={() =>
                                                    increaseQuantity(index)
                                                }
                                                className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-accent transition"
                                            >
                                                <FaPlus size={13} />
                                            </button>

                                        </div>


                                        {/* Product Total */}
                                        <div className="text-right">

                                            <p className="text-xs text-gray-400">
                                                Total
                                            </p>

                                            <p className="font-bold text-gray-900">
                                                {getFormattedPrice(
                                                    cartItem.product.price *
                                                    cartItem.qty
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* ORDER SUMMARY */}
                    <div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-6">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center text-accent">

                                    <FiShoppingBag size={21} />

                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        Order Summary
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        {cart.length} products
                                    </p>

                                </div>

                            </div>


                            {/* Summary */}
                            <div className="mt-7">

                                <div className="flex justify-between text-sm">

                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-gray-800">
                                        {getFormattedPrice(total)}
                                    </span>

                                </div>


                                <div className="flex justify-between text-sm mt-4">

                                    <span className="text-gray-500">
                                        Delivery
                                    </span>

                                    <span className="text-gray-500">
                                        Calculated later
                                    </span>

                                </div>

                            </div>


                            <div className="border-t border-gray-200 my-6" />


                            {/* Final Total */}
                            <div className="flex justify-between items-end">

                                <span className="font-semibold text-gray-800">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-accent">
                                    {getFormattedPrice(total)}
                                </span>

                            </div>


                            {/* Order Button */}
                            <button
                                className="w-full h-[50px] mt-7 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition"
                            >
                                Order Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}