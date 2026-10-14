
import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/products");

        if (active) {
          setProducts(
            Array.isArray(response.data)
              ? response.data
              : []
          );
        }
      } catch (err) {
        if (active) {
          console.error("Error fetching products:", err);
          setError("Failed to load products.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, [retry]);

  const availableProducts = products.filter(
    (product) =>
      product.isAvailable === true &&
      Number(product.stock) > 0
  ).length;

  const totalCategories = new Set(
    products.map((product) => product.category).filter(Boolean)
  ).size;

  return (
    <main className="min-h-screen bg-[#090b10] text-white">

      <section className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            {/* Small Label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-blue-500" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                The Collection
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Explore Our{" "}
              <span className="text-blue-400">
                Products.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              Discover high-performance computers,
              gaming gear, components, and accessories
              built to power your setup.
            </p>
          </div>

          {/* Product Statistics */}
          {!loading && !error && (
            <div className="flex items-center gap-5 sm:gap-8">

              <div>
                <h3 className="text-2xl font-bold text-white">
                  {products.length}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Products
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <h3 className="text-2xl font-bold text-white">
                  {totalCategories}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Categories
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <h3 className="text-2xl font-bold text-blue-400">
                  {availableProducts}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  In Stock
                </p>
              </div>

            </div>
          )}
        </div>

        {/* Loading */}
        {loading && <LoadingScreen />}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-center">

            <h2 className="text-xl font-semibold text-white">
              Unable to Load Products
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              {error}
            </p>

            <button
              onClick={() => setRetry((prev) => prev + 1)}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Empty Products */}
        {!loading && !error && products.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-center">

            <h2 className="text-xl font-semibold text-white">
              No Products Available
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              New products will be added soon.
            </p>

          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

            {/* Bottom Section */}
            <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6">

              <p className="text-xs text-zinc-500">
                Showing {products.length} products
              </p>

              <p className="hidden text-xs text-zinc-500 sm:block">
                Find your next upgrade.
              </p>

            </div>
          </>
        )}

      </section>
    </main>
  );
}
