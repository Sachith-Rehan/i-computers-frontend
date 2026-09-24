import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FiX, FiMapPin, FiPhone, FiUser, FiShoppingBag } from "react-icons/fi";

export default function CreateOrder(props) {

    const [isModalOpen, setModalOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const cart = props.cart || [];

    async function placeOrder() {

        if (
            !firstName ||
            !lastName ||
            !addressLine1 ||
            !city ||
            !phone
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        try {

            setLoading(true);

            const body = {
                firstName,
                lastName,
                addressLine1,
                addressLine2,
                city,
                phone,
                items: []
            };

            for (let i = 0; i < cart.length; i++) {

                const item = cart[i];

                body.items.push({
                    productId: item.product.productId,
                    qty: item.qty
                });
            }

            const token = localStorage.getItem("token");

            await api.post("/orders", body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Order placed successfully");

            setModalOpen(false);

            navigate("/");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Error placing order"
            );

        } finally {

            setLoading(false);
        }
    }

    return (
        <>

            {/* ORDER MODAL */}
            {isModalOpen && (

                <div
                    className="
                        fixed inset-0
                        z-50
                        bg-black/60
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        p-4
                    "
                >

                    <div
                        className="
                            relative
                            w-full
                            max-w-[650px]
                            max-h-[90vh]
                            overflow-y-auto
                            bg-white
                            rounded-3xl
                            shadow-2xl
                        "
                    >

                        {/* HEADER */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                px-7
                                py-6
                                border-b
                                border-gray-100
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        w-11
                                        h-11
                                        rounded-xl
                                        bg-accent/10
                                        text-accent
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FiShoppingBag size={22} />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        Checkout
                                    </h1>

                                    <p className="text-sm text-gray-500">
                                        Enter your delivery information
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() => setModalOpen(false)}
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-500
                                    hover:text-gray-900
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                <FiX size={22} />
                            </button>

                        </div>


                        {/* FORM */}
                        <div className="p-7">

                            {/* CONTACT */}
                            <div className="mb-7">

                                <div className="flex items-center gap-2 mb-4">
                                    <FiUser className="text-accent" />

                                    <h2 className="font-semibold text-gray-800">
                                        Personal Information
                                    </h2>
                                </div>


                                {/* FIRST + LAST NAME */}
                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >

                                    <div>
                                        <label
                                            className="
                                                block
                                                text-sm
                                                font-medium
                                                text-gray-700
                                                mb-2
                                            "
                                        >
                                            First Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            className="
                                                w-full
                                                h-[48px]
                                                px-4
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                text-gray-800
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:bg-white
                                                focus:border-accent
                                                focus:ring-2
                                                focus:ring-accent/10
                                                transition
                                            "
                                        />
                                    </div>


                                    <div>
                                        <label
                                            className="
                                                block
                                                text-sm
                                                font-medium
                                                text-gray-700
                                                mb-2
                                            "
                                        >
                                            Last Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            className="
                                                w-full
                                                h-[48px]
                                                px-4
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                outline-none
                                                focus:bg-white
                                                focus:border-accent
                                                focus:ring-2
                                                focus:ring-accent/10
                                                transition
                                            "
                                        />
                                    </div>

                                </div>


                                {/* PHONE */}
                                <div className="mt-4">

                                    <label
                                        className="
                                            block
                                            text-sm
                                            font-medium
                                            text-gray-700
                                            mb-2
                                        "
                                    >
                                        Phone Number
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">

                                        <FiPhone
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />

                                        <input
                                            type="tel"
                                            placeholder="07X XXX XXXX"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            className="
                                                w-full
                                                h-[48px]
                                                pl-11
                                                pr-4
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                outline-none
                                                focus:bg-white
                                                focus:border-accent
                                                focus:ring-2
                                                focus:ring-accent/10
                                                transition
                                            "
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* DELIVERY ADDRESS */}
                            <div>

                                <div className="flex items-center gap-2 mb-4">

                                    <FiMapPin className="text-accent" />

                                    <h2 className="font-semibold text-gray-800">
                                        Delivery Address
                                    </h2>

                                </div>


                                {/* ADDRESS 1 */}
                                <div className="mb-4">

                                    <label
                                        className="
                                            block
                                            text-sm
                                            font-medium
                                            text-gray-700
                                            mb-2
                                        "
                                    >
                                        Address Line 1
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="House number, street"
                                        value={addressLine1}
                                        onChange={(e) =>
                                            setAddressLine1(e.target.value)
                                        }
                                        className="
                                            w-full
                                            h-[48px]
                                            px-4
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            outline-none
                                            focus:bg-white
                                            focus:border-accent
                                            focus:ring-2
                                            focus:ring-accent/10
                                            transition
                                        "
                                    />

                                </div>


                                {/* ADDRESS 2 */}
                                <div className="mb-4">

                                    <label
                                        className="
                                            block
                                            text-sm
                                            font-medium
                                            text-gray-700
                                            mb-2
                                        "
                                    >
                                        Address Line 2
                                        <span
                                            className="
                                                text-gray-400
                                                font-normal
                                                ml-1
                                            "
                                        >
                                            (Optional)
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Apartment, landmark, etc."
                                        value={addressLine2}
                                        onChange={(e) =>
                                            setAddressLine2(e.target.value)
                                        }
                                        className="
                                            w-full
                                            h-[48px]
                                            px-4
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            outline-none
                                            focus:bg-white
                                            focus:border-accent
                                            focus:ring-2
                                            focus:ring-accent/10
                                            transition
                                        "
                                    />

                                </div>


                                {/* CITY */}
                                <div>

                                    <label
                                        className="
                                            block
                                            text-sm
                                            font-medium
                                            text-gray-700
                                            mb-2
                                        "
                                    >
                                        City
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        className="
                                            w-full
                                            h-[48px]
                                            px-4
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            outline-none
                                            focus:bg-white
                                            focus:border-accent
                                            focus:ring-2
                                            focus:ring-accent/10
                                            transition
                                        "
                                    />

                                </div>

                            </div>


                            {/* BUTTONS */}
                            <div
                                className="
                                    flex
                                    flex-col-reverse
                                    sm:flex-row
                                    gap-3
                                    mt-8
                                "
                            >

                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="
                                        sm:w-1/3
                                        h-[50px]
                                        border
                                        border-gray-200
                                        text-gray-700
                                        font-semibold
                                        rounded-xl
                                        hover:bg-gray-50
                                        transition
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={placeOrder}
                                    disabled={loading}
                                    className="
                                        sm:w-2/3
                                        h-[50px]
                                        bg-accent
                                        text-white
                                        font-semibold
                                        rounded-xl
                                        shadow-lg
                                        shadow-accent/20
                                        hover:opacity-90
                                        disabled:opacity-60
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    {loading
                                        ? "Placing Order..."
                                        : "Confirm Order"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* ORDER BUTTON */}
            <button
                onClick={() => setModalOpen(true)}
                className="
                    w-full
                    h-[52px]
                    mt-7
                    bg-accent
                    text-white
                    font-semibold
                    rounded-xl
                    shadow-lg
                    shadow-accent/20
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:opacity-95
                    active:translate-y-0
                    transition
                    duration-200
                "
            >
                Order Now
            </button>

        </>
    );
}