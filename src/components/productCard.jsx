
import getFormattedPrice from "../utils/priceFormatter";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstImage = product.images?.[0];

  const imageUrl =
    (typeof firstImage === "string"
      ? firstImage
      : firstImage?.url) || "/placeholder.png";

  const price = Number(product.price) || 0;
  const labelledPrice = Number(product.labelledPrice) || 0;

  const discount =
    labelledPrice > price
      ? Math.round(
          ((labelledPrice - price) / labelledPrice) * 100
        )
      : 0;

  const isAvailable =
    product.isAvailable === true &&
    Number(product.stock) > 0;

  return (
    <article className="group relative flex h-[530px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#14171e] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)]">

      {/* Product Image Section */}
      <div className="relative h-[235px] w-full shrink-0 overflow-hidden bg-[#f3f4f6]">

        {/* Subtle Image Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,#f3f4f6_75%)]" />

        {/* Product Image */}
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            if (!e.currentTarget.src.endsWith("/placeholder.png")) {
              e.currentTarget.src = "/placeholder.png";
            }
          }}
          className="relative h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transform-none"
        />

        {/* Top Badges */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">

          {/* Discount Badge */}
          {discount > 0 ? (
            <span className="inline-flex items-center rounded-lg bg-red-500 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
              -{discount}% OFF
            </span>
          ) : (
            <span />
          )}

          {/* Stock Badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold shadow-sm backdrop-blur-md ${
              isAvailable
                ? "border-emerald-200 bg-white/90 text-emerald-700"
                : "border-red-200 bg-white/90 text-red-600"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isAvailable
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>

        </div>

        {/* Image Bottom Accent */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      </div>

      {/* Product Details */}
      <div className="flex min-h-0 flex-1 flex-col bg-[#14171e] p-4 sm:p-5">

        {/* Category */}
        <div className="mb-2 flex items-center gap-2">

          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />

          <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-blue-400">
            {product.category || "Technology"}
          </p>

        </div>

        {/* Product Name */}
        <h2 className="line-clamp-2 min-h-[44px] text-sm font-semibold leading-[22px] tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400 sm:text-base">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">
          {product.description ||
            "Discover performance, quality, and innovation."}
        </p>

        {/* Price + Action */}
        <div className="mt-auto pt-3">

          <div className="mb-3 h-px w-full bg-white/[0.08]" />

          {/* Price Area */}
          <div className="flex min-h-[48px] items-center justify-between gap-2">

            <div className="min-w-0">

              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Price
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">

                <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
                  {getFormattedPrice(price)}
                </span>

                {labelledPrice > price && (
                  <span className="text-[11px] text-zinc-500 line-through">
                    {getFormattedPrice(labelledPrice)}
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* CTA Button */}
          {isAvailable ? (
            <Link
              to={`/overview/${product.productId}`}
              aria-label={`View ${product.name}`}
              className="group/btn mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold tracking-wide text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_6px_24px_rgba(37,99,235,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              View Product

              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>

            </Link>
          ) : (
            <div className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.05] px-4 py-3 text-xs font-semibold text-zinc-500">
              Currently Unavailable
            </div>
          )}

        </div>

      </div>

    </article>
  );
}
