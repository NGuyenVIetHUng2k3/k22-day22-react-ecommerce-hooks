import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProduct() {
      setLoading(true)
      setError('')
      setProduct(null)
      try {
        const response = await fetch(`https://dummyjson.com/products/${encodeURIComponent(productId ?? '')}`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          if (response.status === 404) throw new Error('Sản phẩm bạn tìm không tồn tại.')
          throw new Error(`Yêu cầu thất bại (HTTP ${response.status}).`)
        }
        setProduct((await response.json()) as Product)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return
        setError(fetchError instanceof Error ? fetchError.message : 'Đã xảy ra lỗi không xác định.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void fetchProduct()
    return () => controller.abort()
  }, [productId])

  if (loading) return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8"><Loading label="Đang tải sản phẩm..." /></div>
  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <ErrorMessage message={error} />
        <Link className="text-sm font-semibold text-emerald-800 hover:text-emerald-950" to="/products">← Quay lại danh sách sản phẩm</Link>
      </section>
    )
  }
  if (!product) return null

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-emerald-800" to="/products">
        <span aria-hidden="true">←</span> Quay lại sản phẩm
      </Link>
      <div className="mt-7 grid gap-9 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-3xl bg-stone-100">
          <img alt={product.title} className="aspect-square size-full object-cover" src={product.images?.[0] ?? product.thumbnail} />
        </div>
        <div className="flex flex-col justify-center py-3">
          <span className="w-fit rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold capitalize text-emerald-900">{product.category}</span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">{product.title}</h1>
          {product.rating !== undefined && (
            <p className="mt-4 flex items-center gap-2 text-sm text-stone-500"><span className="text-amber-500">★</span> {product.rating.toFixed(1)} / 5</p>
          )}
          <p className="mt-5 text-3xl font-bold text-emerald-900">${product.price.toFixed(2)}</p>
          <div className="my-7 h-px bg-stone-200" />
          <h2 className="font-semibold text-stone-900">Thông tin sản phẩm</h2>
          <p className="mt-3 leading-7 text-stone-600">{product.description}</p>
          <button
            className="mt-8 w-full rounded-full bg-emerald-900 px-7 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:w-fit"
            onClick={() => addToCart(product)}
            type="button"
          >
            Thêm vào giỏ hàng <span aria-hidden="true" className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
