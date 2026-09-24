import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    const navStyle = ({ isActive }) =>
        `relative text-[15px] font-medium transition duration-200
        ${
            isActive
                ? "text-white"
                : "text-white/75 hover:text-white"
        }`;

    return (
        <header
            className="
                w-full
                h-[85px]
                bg-accent
                border-b
                border-white/10
                shadow-sm
                sticky
                top-0
                z-50
            "
        >

            <div
                className="
                    max-w-[1400px]
                    h-full
                    mx-auto
                    px-5
                    sm:px-8
                    lg:px-12
                    flex
                    items-center
                    justify-between
                "
            >

                {/* LOGO */}
                <Link
                    to="/"
                    className="flex items-center shrink-0"
                >

                    <img
                        src="/header-logo.png"
                        alt="iComputers"
                        className="
                            h-[55px]
                            sm:h-[62px]
                            w-auto
                            object-contain
                        "
                    />

                </Link>


                {/* DESKTOP NAVIGATION */}
                <nav
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-9
                    "
                >

                    <NavLink
                        to="/"
                        className={navStyle}
                    >
                        {({ isActive }) => (
                            <>
                                Home

                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            -bottom-2
                                            w-full
                                            h-[2px]
                                            bg-white
                                            rounded-full
                                        "
                                    />
                                )}
                            </>
                        )}
                    </NavLink>


                    <NavLink
                        to="/products"
                        className={navStyle}
                    >
                        {({ isActive }) => (
                            <>
                                Products

                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            -bottom-2
                                            w-full
                                            h-[2px]
                                            bg-white
                                            rounded-full
                                        "
                                    />
                                )}
                            </>
                        )}
                    </NavLink>


                    <NavLink
                        to="/contact-us"
                        className={navStyle}
                    >
                        {({ isActive }) => (
                            <>
                                Contact Us

                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            -bottom-2
                                            w-full
                                            h-[2px]
                                            bg-white
                                            rounded-full
                                        "
                                    />
                                )}
                            </>
                        )}
                    </NavLink>

                </nav>


                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">

                    {/* CART */}
                    <Link
                        to="/cart"
                        className="
                            relative
                            w-[44px]
                            h-[44px]
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-white
                            hover:text-accent
                            transition
                            duration-200
                        "
                    >

                        <FaShoppingCart size={19} />

                    </Link>


                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="
                            md:hidden
                            w-[44px]
                            h-[44px]
                            rounded-xl
                            bg-white/10
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-white/20
                            transition
                        "
                    >

                        {menuOpen ? (
                            <FiX size={23} />
                        ) : (
                            <FiMenu size={23} />
                        )}

                    </button>

                </div>

            </div>


            {/* MOBILE NAVIGATION */}
            {menuOpen && (

                <div
                    className="
                        md:hidden
                        absolute
                        top-[85px]
                        left-0
                        w-full
                        bg-accent
                        border-t
                        border-white/10
                        shadow-xl
                        px-5
                        py-5
                    "
                >

                    <nav className="flex flex-col gap-2">

                        <NavLink
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-xl text-sm font-medium transition
                                ${
                                    isActive
                                        ? "bg-white text-accent"
                                        : "text-white hover:bg-white/10"
                                }`
                            }
                        >
                            Home
                        </NavLink>


                        <NavLink
                            to="/products"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-xl text-sm font-medium transition
                                ${
                                    isActive
                                        ? "bg-white text-accent"
                                        : "text-white hover:bg-white/10"
                                }`
                            }
                        >
                            Products
                        </NavLink>


                        <NavLink
                            to="/contact-us"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-xl text-sm font-medium transition
                                ${
                                    isActive
                                        ? "bg-white text-accent"
                                        : "text-white hover:bg-white/10"
                                }`
                            }
                        >
                            Contact Us
                        </NavLink>

                    </nav>

                </div>

            )}

        </header>
    );
}