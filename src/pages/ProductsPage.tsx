import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import type { Product, ProductsResponse } from '../types/product'

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') ?? ''
  const selectedCategory = searchParams.get('category') ?? ''

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('https://dummyjson.com/products', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại (HTTP ${response.status}).`)
        }
        const data = (await response.json()) as ProductsResponse
        setProducts(Array.isArray(data.products) ? data.products : [])
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return
        setError(fetchError instanceof Error ? fetchError.message : 'Đã xảy ra lỗi không xác định.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void fetchProducts()
    return () => controller.abort()
  }, [retryCount])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b)),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()
    return products.filter((product) => {
      const matchesSearch = product.title.toLocaleLowerCase().includes(normalizedSearch)
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  function updateFilter(key: 'search' | 'category', value: string) {
    const nextParams = new URLSearchParams(searchParams)
    if (value) nextParams.set(key, value)
    else nextParams.delete(key)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Bộ sưu tập của chúng tôi</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">Sản phẩm</h1>
          <p className="mt-3 text-stone-500">Tìm món đồ phù hợp với nhịp sống của bạn.</p>
        </div>
        {!loading && !error && <p className="text-sm text-stone-500">{filteredProducts.length} sản phẩm</p>}
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-[1fr_240px]">
        <label className="relative">
          <span className="sr-only">Tìm kiếm sản phẩm</span>
          <svg aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" fill="none" height="20" viewBox="0 0 24 24" width="20">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          <input
            className="h-12 w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-800/5"
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Tìm tên sản phẩm..."
            type="search"
            value={searchTerm}
          />
        </label>
        <label>
          <span className="sr-only">Lọc theo danh mục</span>
          <select
            className="h-12 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm text-stone-700 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-800/5"
            onChange={(event) => updateFilter('category', event.target.value)}
            value={selectedCategory}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
      </div>

      {loading ? <Loading /> : error ? (
        <ErrorMessage message={error} onRetry={() => setRetryCount((count) => count + 1)} />
      ) : filteredProducts.length === 0 ? (
        <div className="my-12 rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-stone-800">{products.length === 0 ? 'Chưa có sản phẩm nào.' : 'Không tìm thấy sản phẩm phù hợp.'}</p>
          <p className="mt-2 text-sm text-stone-500">Thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
        </div>
      ) : (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  )
}

export default ProductsPage
