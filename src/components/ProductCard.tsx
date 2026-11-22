import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5">
      <Link className="relative block aspect-[4/3] overflow-hidden bg-stone-100" to={`/products/${product.id}`}>
        <img
          alt={product.title}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={product.thumbnail}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-stone-700 backdrop-blur">
          {product.category}
        </span>
      </Link>
      <div className="p-5">
        <Link className="line-clamp-1 text-base font-semibold text-stone-900 hover:text-emerald-800" to={`/products/${product.id}`}>
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-emerald-900">${product.price.toFixed(2)}</span>
          <button
            aria-label={`Thêm ${product.title} vào giỏ`}
            className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-800 transition hover:bg-emerald-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            onClick={() => addToCart(product)}
            type="button"
          >
            <svg aria-hidden="true" fill="none" height="19" viewBox="0 0 24 24" width="19">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              <circle cx="10" cy="21" r="1" fill="currentColor" />
              <circle cx="18" cy="21" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
        <Link className="mt-4 inline-block text-sm font-semibold text-stone-500 transition hover:text-emerald-800" to={`/products/${product.id}`}>
          Xem chi tiết <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
