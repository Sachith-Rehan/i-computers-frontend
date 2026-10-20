
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiShoppingCart,
  FiCheck,
  FiX,
  FiMinus,
  FiPlus,
  FiPackage,
  FiHeadphones,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";

import LoadingScreen from "../components/loadingScreen";
import ProductImageSlideShow from "../components/productImageSlideShow";
import getFormattedPrice from "../utils/priceFormatter";
import api from "../utils/api";
import { addToCart } from "../utils/cart";
import {
  showErrorToast,
  showSuccessToast,
} from "../utils/toast";

export default function ProductOverViewPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    let active = true;

    if (!productId) {
      navigate("/products", { replace: true });
      return;
    }

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setQuantity(1);
      setActiveTab("description");

      try {
        const response = await api.get(
          `/products/${encodeURIComponent(productId)}`
        );

        if (active) {
          setProduct(response.data);
        }
      } catch (err) {
        if (active) {
          console.error("Error fetching product:", err);
          setError("Unable to load this product.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      active = false;
    };
  }, [productId, navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#090b10] px-6 text-center text-white">
        <FiPackage className="mb-5 text-5xl text-zinc-500" />

        <h1 className="text-2xl font-semibold">
          Product not available
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          {error || "This product could not be found."}
        </p>

        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          <FiArrowLeft />
          Back to products
        </Link>
      </main>
    );
  }

  const price = Number(product.price) || 0;
  const labelledPrice = Number(product.labelledPrice) || 0;
  const stock = Math.max(0, Number(product.stock) || 0);

  const isAvailable =
    product.isAvailable === true && stock > 0;

  const discount =
    labelledPrice > price
      ? Math.round(
          ((labelledPrice - price) / labelledPrice) * 100
        )
      : 0;

  const savings = Math.max(0, labelledPrice - price);

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, stock));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (!isAvailable) return;

    try {
      const success = addToCart(product, quantity);

      if (success) {
        showSuccessToast("Product added to cart!");
      } else {
        showErrorToast("Unable to add product!");
      }
    } catch (err) {
      console.error("Cart error:", err);
      showErrorToast("Unable to add product!");
    }
  };

  const firstImage = product.images?.[0];

  const checkoutImage =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url || "/placeholder.png";

  const specifications = [
    { label: "Product ID", value: product.productId },
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model },
    { label: "Category", value: product.category },
  ].filter(
    (item) => item.value !== null &&
      item.value !== undefined &&
      item.value !== ""
  );

  return (
    <main className="min-h-screen bg-[#090b10] text-white">

      {/* BREADCRUMB */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-hidden px-4 py-5 text-xs text-zinc-500 sm:px-6 lg:px-10">
          <Link to="/" className="shrink-0 hover:text-blue-400">
            Home
          </Link>

          <FiChevronRight className="shrink-0" />

          <Link
            to="/products"
            className="shrink-0 hover:text-blue-400"
          >
            Products
          </Link>

          <FiChevronRight className="shrink-0" />

          <span className="truncate text-zinc-300">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pt-12">

        {/* BACK LINK */}
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="group mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-blue-400"
        >
          <FiArrowLeft className="transition group-hover:-translate-x-1" />
          Back to products
        </button>

        {/* MAIN PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">

          {/* PRODUCT GALLERY */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#14171e]">

              {discount > 0 && (
                <span className="absolute left-5 top-5 z-10 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">
                  -{discount}%
                </span>
              )}

              <div className="flex min-h-[340px] items-center justify-center p-4 sm:min-h-[500px] sm:p-8">
                <ProductImageSlideShow
                  images={product.images || []}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
              <span>Product gallery</span>
              <span>
                {product.images?.length || 0} images
              </span>
            </div>
          </div>

          {/* PRODUCT PURCHASE DETAILS */}
          <div className="min-w-0">

            {/* CATEGORY */}
            {product.category && (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                {product.category}
              </p>
            )}

            {/* PRODUCT TITLE */}
            <h1 className="text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-[42px]">
              {product.name}
            </h1>

            {/* BRAND AND MODEL */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
              {product.brand && (
                <p>
                  Brand:{" "}
                  <span className="font-medium text-zinc-200">
                    {product.brand}
                  </span>
                </p>
              )}

              {product.model && (
                <p>
                  Model:{" "}
                  <span className="font-medium text-zinc-200">
                    {product.model}
                  </span>
                </p>
              )}
            </div>

            <div className="my-8 border-t border-white/10" />

            {/* PRICE */}
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {getFormattedPrice(price)}
                </p>

                {discount > 0 && (
                  <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {labelledPrice > price && (
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-zinc-500 line-through">
                    {getFormattedPrice(labelledPrice)}
                  </span>

                  <span className="font-medium text-emerald-400">
                    Save {getFormattedPrice(savings)}
                  </span>
                </div>
              )}
            </div>

            {/* STOCK AVAILABILITY */}
            <div className="mt-7">
              {isAvailable ? (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <FiCheck className="text-lg" />

                  <span className="font-semibold">
                    In Stock
                  </span>

                  <span className="text-zinc-500">
                    — {stock} available
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <FiX className="text-lg" />
                  <span className="font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* PURCHASE AREA */}
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#111318] p-5 sm:p-6">

              {/* QUANTITY SELECTOR */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Quantity
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Select how many you need
                  </p>
                </div>

                <div className="flex h-11 items-center overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12]">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={!isAvailable || quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-full w-11 items-center justify-center text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiMinus />
                  </button>

                  <span className="flex h-full min-w-12 items-center justify-center border-x border-white/10 text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={!isAvailable || quantity >= stock}
                    aria-label="Increase quantity"
                    className="flex h-full w-11 items-center justify-center text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* PURCHASE BUTTONS */}
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  <FiShoppingCart className="text-lg" />
                  Add to Cart
                </button>

                {isAvailable ? (
                  <Link
                    to="/checkout"
                    state={[
                      {
                        product: {
                          productId: product.productId,
                          name: product.name,
                          image: checkoutImage,
                          price: price,
                          labelledPrice: labelledPrice,
                        },
                        qty: quantity,
                      },
                    ]}
                    className="flex min-h-13 items-center justify-center gap-2 rounded-xl border border-blue-500 px-5 py-3.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
                  >
                    Buy Now
                    <FiArrowRight />
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-13 cursor-not-allowed rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-zinc-600"
                  >
                    Unavailable
                  </button>
                )}
              </div>
            </div>

            {/* SUPPORT INFO */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex items-center gap-3">
                <FiHeadphones className="text-xl text-blue-400" />

                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    Need assistance?
                  </p>

                  <Link
                    to="/contact"
                    className="mt-1 block text-xs text-zinc-500 transition hover:text-blue-400"
                  >
                    Contact our team
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiRefreshCw className="text-xl text-blue-400" />

                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    Product information
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Check details below
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS TABS */}
        <section className="mt-20 border-t border-white/10 pt-10">

          <div className="flex gap-8 border-b border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`relative pb-5 text-sm font-semibold transition ${
                activeTab === "description"
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Description

              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-500" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("specifications")}
              className={`relative pb-5 text-sm font-semibold transition ${
                activeTab === "specifications"
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Specifications

              {activeTab === "specifications" && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-500" />
              )}
            </button>
          </div>

          <div className="py-10">

            {/* DESCRIPTION */}
            {activeTab === "description" && (
              <div className="max-w-4xl">
                <h2 className="mb-5 text-2xl font-semibold">
                  About this product
                </h2>

                <p className="whitespace-pre-line break-words text-sm leading-8 text-zinc-400 sm:text-base">
                  {product.description ||
                    "No description is available for this product."}
                </p>
              </div>
            )}

            {/* SPECIFICATIONS */}
            {activeTab === "specifications" && (
              <div className="max-w-3xl">
                <h2 className="mb-6 text-2xl font-semibold">
                  Product Specifications
                </h2>

                <div className="overflow-hidden rounded-xl border border-white/10">
                  {specifications.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`grid grid-cols-2 gap-4 px-5 py-4 text-sm sm:px-7 ${
                        index % 2 === 0
                          ? "bg-[#14171d]"
                          : "bg-[#0f1116]"
                      }`}
                    >
                      <span className="text-zinc-500">
                        {spec.label}
                      </span>

                      <span className="break-words font-medium text-zinc-200">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM SECTION */}
        {/* <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-[#111318] p-7 sm:p-9 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Continue exploring
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Discover more computers, components, and
              accessories for your setup.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#090b10] transition hover:bg-zinc-200"
          >
            Browse Products
            <FiArrowRight />
          </Link>
        </div> */}
      </div>
    </main>
  );
}
