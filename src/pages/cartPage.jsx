import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FiMinus,
    FiPlus,
    FiTrash2,
    FiShoppingBag,
    FiArrowRight
} from "react-icons/fi";

import getCart from "../utils/cart";
import getFormattedPrice from "../utils/priceFormatter";

export default function CartPage() {

    const [cart, setCart] = useState(getCart());

    // Save changes to state + localStorage
    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    // Increase quantity
    const increaseQuantity = (index) => {

        const updatedCart = [...cart];

        updatedCart[index].qty += 1;

        updateCart(updatedCart);
    };


    // Decrease quantity
    const decreaseQuantity = (index) => {

        const updatedCart = [...cart];

        if (updatedCart[index].qty > 1) {

            updatedCart[index].qty -= 1;

        } else {

            updatedCart.splice(index, 1);
        }

        updateCart(updatedCart);
    };


    // Remove product
    const removeProduct = (index) => {

        const updatedCart = [...cart];

        updatedCart.splice(index, 1);

        updateCart(updatedCart);
    };


    // Cart subtotal
    const subtotal = cart.reduce((total, cartItem) => {

        return total + cartItem.product.price * cartItem.qty;

    }, 0);


    // Empty cart
    if (cart.length === 0) {

        return (
            <div className="w-full min-h-[calc(100vh-100px)] bg-gray-50 flex items-center justify-center px-6">

                <div className="text-center max-w-md">

                    <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                        <FiShoppingBag className="text-accent text-4xl" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mt-6">
                        Your cart is empty
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Looks like you haven't added any products to your cart yet.
                    </p>

                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold mt-6 hover:opacity-90 transition"
                    >
                        Browse Products

                        <FiArrowRight />
                    </Link>

                </div>

            </div>
        );
    }


    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-gray-50">

            <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* Header */}
                <div className="mb-8">

                    <p className="text-sm text-accent font-semibold uppercase tracking-wide">
                        Shopping Cart
                    </p>

                    <div className="flex items-end justify-between mt-1">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Your Cart
                        </h1>

                        <span className="text-sm text-gray-500">
                            {cart.length} {cart.length === 1 ? "item" : "items"}
                        </span>

                    </div>

                </div>


                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">


                    {/* LEFT - CART ITEMS */}
                    <div className="flex flex-col gap-4">

                        {cart.map((cartItem, index) => (

                            <div
                                key={cartItem.product.productId}
                                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
                            >

                                <div className="flex flex-col sm:flex-row gap-5">


                                    {/* Product Image */}
                                    <div className="w-full sm:w-[150px] h-[150px] bg-gray-50 rounded-xl flex items-center justify-center shrink-0">

                                        <img
                                            src={cartItem.product.image}
                                            alt={cartItem.product.name}
                                            className="w-full h-full object-contain p-4"
                                        />

                                    </div>


                                    {/* Product Details */}
                                    <div className="flex flex-col flex-1 min-w-0">


                                        {/* Name + Delete */}
                                        <div className="flex justify-between gap-4">

                                            <div>

                                                <p className="text-xs font-medium text-gray-400">
                                                    {cartItem.product.productId}
                                                </p>

                                                <h2 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
                                                    {cartItem.product.name}
                                                </h2>

                                            </div>


                                            <button
                                                onClick={() => removeProduct(index)}
                                                className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                            >
                                                <FiTrash2 size={19} />
                                            </button>

                                        </div>


                                        {/* Price */}
                                        <div className="mt-3">

                                            <p className="text-xl font-bold text-accent">
                                                {getFormattedPrice(cartItem.product.price)}
                                            </p>

                                            {cartItem.product.labelledPrice >
                                                cartItem.product.price && (

                                                <p className="text-sm text-gray-400 line-through mt-1">
                                                    {getFormattedPrice(
                                                        cartItem.product.labelledPrice
                                                    )}
                                                </p>
                                            )}

                                        </div>


                                        {/* Bottom */}
                                        <div className="mt-auto pt-5 flex items-center justify-between gap-4">


                                            {/* Quantity */}
                                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(index)
                                                    }
                                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-accent transition"
                                                >
                                                    <FiMinus size={16} />
                                                </button>


                                                <span className="w-11 text-center font-semibold text-gray-800">
                                                    {cartItem.qty}
                                                </span>


                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(index)
                                                    }
                                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-accent transition"
                                                >
                                                    <FiPlus size={16} />
                                                </button>

                                            </div>


                                            {/* Item Total */}
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

                            </div>

                        ))}


                        {/* Continue Shopping */}
                        <Link
                            to="/products"
                            className="text-accent font-semibold text-sm hover:underline w-fit mt-2"
                        >
                            ← Continue Shopping
                        </Link>

                    </div>


                    {/* RIGHT - ORDER SUMMARY */}
                    <div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-6">

                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>


                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-gray-500">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        {getFormattedPrice(subtotal)}
                                    </span>

                                </div>


                                <div className="flex justify-between text-gray-500">

                                    <span>
                                        Delivery
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        Calculated at checkout
                                    </span>

                                </div>

                            </div>


                            <div className="border-t border-gray-200 my-6"></div>


                            <div className="flex justify-between items-end">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Total
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Before delivery charges
                                    </p>

                                </div>


                                <p className="text-2xl font-bold text-accent">
                                    {getFormattedPrice(subtotal)}
                                </p>

                            </div>


                            <button
                                className="w-full h-[52px] bg-accent text-white rounded-xl font-semibold mt-7 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition"
                            >
                                Proceed to Checkout

                                <FiArrowRight size={19} />
                            </button>


                            <p className="text-xs text-center text-gray-400 mt-4">
                                Secure checkout
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}