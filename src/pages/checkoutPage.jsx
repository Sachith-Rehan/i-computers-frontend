import getCart, { getTotal } from "../utils/cart";
import getFormattedPrice from "../utils/priceFormatter";

import {
    FiArrowLeft,
    FiShoppingBag,
    FiShield,
    FiTruck,
    FiCheck
} from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";
import CreateOrder from "../components/createOrder";

export default function CheckoutPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const cart = location.state || getCart();
    const total = getTotal(cart);

    const totalItems = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-[#f7f8fa]">

            {/* TOP HEADER */}
            <div className="bg-white border-b border-gray-200">

                <div
                    className="
                        max-w-[1200px]
                        mx-auto
                        px-4
                        sm:px-6
                        h-[76px]
                        flex
                        items-center
                        justify-between
                    "
                >

                    <button
                        onClick={() => navigate("/cart")}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-gray-600
                            hover:text-accent
                            transition
                        "
                    >
                        <FiArrowLeft size={19} />

                        Back to Cart
                    </button>


                    <div className="hidden sm:flex items-center gap-2">

                        <div
                            className="
                                w-7
                                h-7
                                rounded-full
                                bg-accent
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <FiCheck size={14} />
                        </div>

                        <div className="w-12 h-[2px] bg-accent" />

                        <div
                            className="
                                w-7
                                h-7
                                rounded-full
                                bg-accent
                                text-white
                                flex
                                items-center
                                justify-center
                                text-xs
                                font-semibold
                            "
                        >
                            2
                        </div>

                        <span className="text-sm font-medium text-gray-700">
                            Checkout
                        </span>

                    </div>

                </div>

            </div>


            {/* PAGE CONTENT */}
            <div
                className="
                    max-w-[1200px]
                    mx-auto
                    px-4
                    sm:px-6
                    py-8
                    lg:py-10
                "
            >

                {/* TITLE */}
                <div className="mb-8">

                    <h1
                        className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-gray-900
                        "
                    >
                        Checkout
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Review your order before continuing.
                    </p>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-[minmax(0,1fr)_380px]
                        gap-7
                        xl:gap-9
                        items-start
                    "
                >

                    {/* LEFT */}
                    <div className="space-y-5">

                        {/* ITEMS CARD */}
                        <div
                            className="
                                bg-white
                                rounded-2xl
                                border
                                border-gray-200
                                shadow-sm
                                overflow-hidden
                            "
                        >

                            {/* CARD HEADER */}
                            <div
                                className="
                                    px-5
                                    sm:px-6
                                    py-5
                                    border-b
                                    border-gray-100
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <h2
                                        className="
                                            text-lg
                                            font-bold
                                            text-gray-900
                                        "
                                    >
                                        Your Order
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        {totalItems}{" "}
                                        {totalItems === 1
                                            ? "item"
                                            : "items"}
                                    </p>

                                </div>


                                <div
                                    className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        bg-accent/10
                                        text-accent
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FiShoppingBag size={19} />
                                </div>

                            </div>


                            {/* PRODUCT LIST */}
                            <div>

                                {cart.map((cartItem, index) => (

                                    <div
                                        key={
                                            cartItem.product.productId
                                        }
                                        className={`
                                            px-5
                                            sm:px-6
                                            py-4

                                            ${
                                                index !==
                                                cart.length - 1
                                                    ? "border-b border-gray-100"
                                                    : ""
                                            }
                                        `}
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-4
                                            "
                                        >

                                            {/* IMAGE */}
                                            <div
                                                className="
                                                    w-[68px]
                                                    h-[68px]
                                                    sm:w-[76px]
                                                    sm:h-[76px]
                                                    bg-gray-50
                                                    border
                                                    border-gray-100
                                                    rounded-xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    shrink-0
                                                "
                                            >

                                                <img
                                                    src={
                                                        cartItem
                                                            .product
                                                            .image
                                                    }
                                                    alt={
                                                        cartItem
                                                            .product
                                                            .name
                                                    }
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-contain
                                                        p-2
                                                    "
                                                />

                                            </div>


                                            {/* INFO */}
                                            <div
                                                className="
                                                    flex-1
                                                    min-w-0
                                                "
                                            >

                                                <h3
                                                    className="
                                                        text-sm
                                                        sm:text-base
                                                        font-semibold
                                                        text-gray-900
                                                        line-clamp-1
                                                    "
                                                >
                                                    {
                                                        cartItem
                                                            .product
                                                            .name
                                                    }
                                                </h3>


                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-400
                                                        mt-1
                                                    "
                                                >
                                                    {
                                                        cartItem
                                                            .product
                                                            .productId
                                                    }
                                                </p>


                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        mt-2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-xs
                                                            font-medium
                                                            text-gray-600
                                                            bg-gray-100
                                                            px-2.5
                                                            py-1
                                                            rounded-md
                                                        "
                                                    >
                                                        Qty:{" "}
                                                        {
                                                            cartItem.qty
                                                        }
                                                    </span>


                                                    {cartItem.product
                                                        .labelledPrice >
                                                        cartItem.product
                                                            .price && (

                                                        <span
                                                            className="
                                                                text-xs
                                                                text-gray-400
                                                                line-through
                                                            "
                                                        >
                                                            {getFormattedPrice(
                                                                cartItem
                                                                    .product
                                                                    .labelledPrice
                                                            )}
                                                        </span>

                                                    )}

                                                </div>

                                            </div>


                                            {/* PRICE */}
                                            <div className="text-right shrink-0">

                                                <p
                                                    className="
                                                        text-sm
                                                        sm:text-base
                                                        font-bold
                                                        text-gray-900
                                                    "
                                                >
                                                    {getFormattedPrice(
                                                        cartItem
                                                            .product
                                                            .price *
                                                        cartItem.qty
                                                    )}
                                                </p>


                                                {cartItem.qty > 1 && (

                                                    <p
                                                        className="
                                                            text-xs
                                                            text-gray-400
                                                            mt-1
                                                        "
                                                    >
                                                        {getFormattedPrice(
                                                            cartItem
                                                                .product
                                                                .price
                                                        )}
                                                        {" each"}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* INFORMATION */}
                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-4
                            "
                        >

                            <div
                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-xl
                                    p-4
                                    flex
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-10
                                        h-10
                                        bg-gray-100
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                        text-gray-600
                                    "
                                >
                                    <FiTruck size={19} />
                                </div>

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-gray-800
                                        "
                                    >
                                        Delivery
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-gray-400
                                            mt-1
                                        "
                                    >
                                        Delivery details will be
                                        confirmed with your order.
                                    </p>

                                </div>

                            </div>


                            <div
                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-xl
                                    p-4
                                    flex
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-10
                                        h-10
                                        bg-gray-100
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                        text-gray-600
                                    "
                                >
                                    <FiShield size={19} />
                                </div>

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-gray-800
                                        "
                                    >
                                        Secure Order
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-gray-400
                                            mt-1
                                        "
                                    >
                                        Your order information is
                                        processed securely.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SUMMARY */}
                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            shadow-sm
                            p-6
                            lg:sticky
                            lg:top-6
                        "
                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-gray-900
                            "
                        >
                            Order Summary
                        </h2>


                        <div className="mt-6 space-y-4">

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span className="text-sm text-gray-500">
                                    Items ({totalItems})
                                </span>

                                <span
                                    className="
                                        text-sm
                                        font-medium
                                        text-gray-800
                                    "
                                >
                                    {getFormattedPrice(total)}
                                </span>

                            </div>


                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span className="text-sm text-gray-500">
                                    Delivery
                                </span>

                                <span
                                    className="
                                        text-sm
                                        font-medium
                                        text-gray-500
                                    "
                                >
                                    Calculated later
                                </span>

                            </div>

                        </div>


                        <div
                            className="
                                border-t
                                border-gray-200
                                my-6
                            "
                        />


                        {/* TOTAL */}
                        <div
                            className="
                                flex
                                items-end
                                justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-base
                                        font-semibold
                                        text-gray-800
                                    "
                                >
                                    Total
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-gray-400
                                        mt-1
                                    "
                                >
                                    Final amount
                                </p>

                            </div>


                            <p
                                className="
                                    text-2xl
                                    font-bold
                                    text-accent
                                "
                            >
                                {getFormattedPrice(total)}
                            </p>

                        </div>


                        {/* ORDER COMPONENT */}
                        <CreateOrder cart={cart} />


                        {/* BOTTOM NOTE */}
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                mt-4
                            "
                        >

                            <FiShield
                                size={14}
                                className="text-gray-400"
                            />

                            <p
                                className="
                                    text-[11px]
                                    text-gray-400
                                "
                            >
                                Secure checkout
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}