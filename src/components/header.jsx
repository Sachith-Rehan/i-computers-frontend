
import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiGrid,
  FiArrowRight,
} from "react-icons/fi";

const categories = [
  { label: "Laptops", value: "laptops" },
  { label: "Graphics Cards", value: "graphic card" },
  { label: "Processors", value: "processor" },
  { label: "Motherboards", value: "motherboard" },
  { label: "RAM", value: "ram" },
  { label: "Storage", value: "storage" },
  { label: "Monitors", value: "monitor" },
  { label: "Keyboards", value: "keyboard" },
  { label: "Mouse", value: "mouse" },
  { label: "Headsets", value: "headset" },
  { label: "Speakers", value: "speaker" },
  { label: "Power Supplies", value: "power supply" },
  { label: "PC Cases", value: "case" },
  { label: "Cooling", value: "cooling" },
];

const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "All Products", to: "/products" },
  { label: "Contact Us", to: "/contact-us" },
];

export default function Header({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const itemCount = Math.max(0, Number(cartCount) || 0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearch(params.get("search") || "");
    setMenuOpen(false);
    setCategoriesOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCategoriesOpen(false);
        setMobileSearchOpen(false);
      }
    }

    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setCategoriesOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    const keyword = search.trim();
    const params = new URLSearchParams();

    if (keyword) {
      params.set("search", keyword);
    }

    navigate(
      `/products${params.toString() ? `?${params}` : ""}`
    );

    setMenuOpen(false);
    setMobileSearchOpen(false);
    setCategoriesOpen(false);
  }

  const desktopNavClass = ({ isActive }) =>
    `group relative flex h-full items-center text-[13px] font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-400"
        : "text-zinc-400 hover:text-white"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `flex items-center justify-between border-l-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "border-blue-500 bg-blue-500/10 text-blue-400"
        : "border-transparent text-zinc-300 hover:border-blue-500/50 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0e14]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl">

      {/* Blue Top Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />

      {/* Main Header */}
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:h-[78px] sm:px-6 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          aria-label="iComputers Home"
          className="flex shrink-0 items-center"
        >
          <img
            src="/header-logo.png"
            alt="iComputers"
            className="h-11 w-auto max-w-[155px] object-contain sm:h-12 sm:max-w-[190px]"
          />
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="hidden min-w-0 max-w-[540px] flex-1 items-center border border-white/10 bg-[#151922] transition-colors duration-200 focus-within:border-blue-500/60 md:flex"
        >
          <FiSearch className="ml-4 shrink-0 text-lg text-blue-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search laptops, monitors, graphics cards..."
            aria-label="Search products"
            className="h-[44px] min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
          />

          <button
            type="submit"
            className="flex h-[44px] shrink-0 items-center justify-center gap-2 border-l border-blue-500/40 bg-blue-600 px-5 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Search
            <FiArrowRight size={15} />
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2">

          {/* Mobile Search */}
          <button
            type="button"
            aria-label={
              mobileSearchOpen ? "Close search" : "Open search"
            }
            aria-expanded={mobileSearchOpen}
            onClick={() => {
              setMobileSearchOpen((prev) => !prev);
              setMenuOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-300 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400 md:hidden"
          >
            {mobileSearchOpen ? (
              <FiX size={20} />
            ) : (
              <FiSearch size={20} />
            )}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${itemCount} items`}
            className="group relative flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-200 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 sm:h-11 sm:w-11"
          >
            <FiShoppingCart
              size={20}
              className="transition-transform duration-200 group-hover:scale-110"
            />

            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center border-2 border-[#0b0e14] bg-blue-600 px-1 text-[10px] font-bold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setMobileSearchOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-white transition-all hover:border-blue-500/40 hover:bg-white/10 sm:h-11 sm:w-11 md:hidden"
          >
            {menuOpen ? (
              <FiX size={22} />
            ) : (
              <FiMenu size={22} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Search Panel */}
      {mobileSearchOpen && (
        <div className="border-t border-white/10 bg-[#10141c] px-4 py-3 md:hidden">

          <form
            onSubmit={handleSearch}
            role="search"
            className="flex items-center border border-white/10 bg-[#171c26] focus-within:border-blue-500/50"
          >
            <FiSearch className="ml-3 shrink-0 text-lg text-blue-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
            />

            <button
              type="submit"
              className="h-11 bg-blue-600 px-5 text-xs font-bold text-white transition-colors hover:bg-blue-500"
            >
              Search
            </button>
          </form>

        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden border-t border-white/[0.07] bg-[#10141c] md:block">

        <div className="mx-auto flex h-[50px] max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">

          <div className="flex h-full items-center gap-8">

            {/* Category Menu */}
            <div
              ref={dropdownRef}
              className="relative flex h-full items-center"
            >
              <button
                type="button"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                onClick={() =>
                  setCategoriesOpen((prev) => !prev)
                }
                className={`flex h-full items-center gap-2 border-b-2 text-[13px] font-semibold transition-colors ${
                  categoriesOpen
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white hover:text-blue-400"
                }`}
              >
                <FiGrid className="text-base text-blue-400" />

                Categories

                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Dropdown */}
              {categoriesOpen && (
                <div className="absolute left-0 top-full z-50 w-[480px] border border-white/10 bg-[#131822] shadow-[0_25px_60px_rgba(0,0,0,0.55)]">

                  {/* Dropdown Heading */}
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Shop by Category
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Find the right gear for your setup
                      </p>
                    </div>

                    <Link
                      to="/products"
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                    >
                      View All
                      <FiArrowRight size={14} />
                    </Link>

                  </div>

                  {/* Categories Grid */}
                  <div className="grid grid-cols-2 gap-px bg-white/[0.06]">

                    {categories.map((category) => (
                      <Link
                        key={category.value}
                        to={`/products?category=${encodeURIComponent(
                          category.value
                        )}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="group/item flex items-center justify-between gap-2 bg-[#131822] px-5 py-3.5 text-xs font-medium text-zinc-300 transition-colors duration-200 hover:bg-[#1c2638] hover:text-blue-400"
                      >
                        <span>{category.label}</span>

                        <FiArrowRight className="shrink-0 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                      </Link>
                    ))}

                  </div>

                  <div className="h-[2px] bg-blue-500/60" />

                </div>
              )}

            </div>

            <div className="h-5 w-px bg-white/10" />

            {/* Desktop Links */}
            <nav
              aria-label="Main navigation"
              className="flex h-full items-center gap-8"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={desktopNavClass}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-full bg-blue-500 transition-transform duration-200 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

          </div>

          {/* Desktop Tagline */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="h-1.5 w-1.5 bg-blue-500" />

            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
              Built for Performance
            </span>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute left-0 top-full z-50 max-h-[calc(100dvh-74px)] w-full overflow-y-auto border-t border-white/10 bg-[#10141c] shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:hidden">

          {/* Navigation Links */}
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 px-4 py-5"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className={mobileNavClass}
              >
                {link.label}

                <FiArrowRight size={15} />
              </NavLink>
            ))}
          </nav>

          {/* Mobile Categories */}
          <div className="border-t border-white/10 px-4 py-5">

            <div className="mb-5 flex items-center gap-3">
              <div className="h-5 w-[2px] bg-blue-500" />

              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                Shop by Category
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">

              {categories.map((category) => (
                <Link
                  key={category.value}
                  to={`/products?category=${encodeURIComponent(
                    category.value
                  )}`}
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#151a24] px-4 py-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                >
                  {category.label}
                </Link>
              ))}

            </div>
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-white/10 px-4 py-5 text-center">
            <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              iComputers — Built for Performance
            </p>
          </div>

        </div>
      )}

    </header>
  );
}
