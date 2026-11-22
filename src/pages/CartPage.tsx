import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, decreaseQuantity, increaseQuantity, removeFromCart, totalPrice, totalQuantity } = useCart()

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Túi mua sắm</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <div className="mt-9 rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-900">
            <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-stone-900">Giỏ hàng của bạn đang trống</h2>
          <p className="mt-2 text-sm text-stone-500">Hãy khám phá và tìm món đồ dành cho bạn.</p>
          <Link className="mt-7 inline-flex rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800" to="/products">Quay lại trang sản phẩm</Link>
        </div>
      ) : (
        <div className="mt-9 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white px-5 sm:px-7">
            {cart.map(({ product, quantity }) => (
              <article className="flex flex-wrap gap-4 py-6 sm:flex-nowrap sm:items-center" key={product.id}>
                <img alt={product.title} className="size-24 rounded-xl bg-stone-100 object-cover sm:size-28" src={product.thumbnail} />
                <div className="min-w-[140px] flex-1">
                  <p className="text-xs font-medium capitalize text-stone-500">{product.category}</p>
                  <h2 className="mt-1 font-semibold text-stone-900">{product.title}</h2>
                  <p className="mt-2 text-sm font-medium text-stone-600">${product.price.toFixed(2)} / sản phẩm</p>
                  <button
                    className="mt-3 text-xs font-semibold text-red-700 hover:text-red-900"
                    onClick={() => removeFromCart(product.id)}
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-stone-200 p-1">
                  <button
                    aria-label={`Giảm số lượng ${product.title}`}
                    className="grid size-8 place-items-center rounded-full text-stone-600 transition hover:bg-stone-100"
                    disabled={quantity <= 1}
                    onClick={() => decreaseQuantity(product.id)}
                    type="button"
                  >−</button>
                  <span className="min-w-5 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    aria-label={`Tăng số lượng ${product.title}`}
                    className="grid size-8 place-items-center rounded-full text-stone-600 transition hover:bg-stone-100"
                    onClick={() => increaseQuantity(product.id)}
                    type="button"
                  >+</button>
                </div>
                <p className="w-full text-right font-bold text-stone-900 sm:w-24">${(product.price * quantity).toFixed(2)}</p>
              </article>
            ))}
          </div>
          <aside className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-stone-900">Tóm tắt đơn hàng</h2>
            <div className="mt-6 flex justify-between text-sm text-stone-600">
              <span>Tổng số lượng</span><span>{totalQuantity}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-base font-semibold text-stone-900">
              <span>Tổng tiền</span><span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link className="mt-7 flex justify-center rounded-full bg-emerald-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800" to="/products">
              Tiếp tục mua sắm
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default CartPage
