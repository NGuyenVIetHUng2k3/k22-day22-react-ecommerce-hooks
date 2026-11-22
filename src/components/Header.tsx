import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Header() {
  const { totalQuantity } = useCart()
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition hover:text-emerald-800 ${isActive ? 'text-emerald-900' : 'text-stone-500'}`

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <NavLink aria-label="Mộc Market - Trang chủ" className="flex items-center gap-2.5" to="/">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-900 text-lg font-bold text-white">m.</span>
          <span className="text-lg font-bold tracking-tight text-stone-900">mộc<span className="text-emerald-800">market</span></span>
        </NavLink>
        <nav aria-label="Điều hướng chính" className="flex items-center gap-5 sm:gap-9">
          <NavLink className={linkClass} to="/">Trang chủ</NavLink>
          <NavLink className={linkClass} to="/products">Sản phẩm</NavLink>
          <NavLink aria-label={`Giỏ hàng, ${totalQuantity} sản phẩm`} className={({ isActive }) => `relative grid size-10 place-items-center rounded-full transition hover:bg-stone-100 ${isActive ? 'text-emerald-900' : 'text-stone-600'}`} to="/cart">
            <svg aria-hidden="true" fill="none" height="21" viewBox="0 0 24 24" width="21">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
              <circle cx="10" cy="21" r="1" fill="currentColor" />
              <circle cx="18" cy="21" r="1" fill="currentColor" />
            </svg>
            <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-emerald-800 px-1 text-[10px] font-bold text-white">
              {totalQuantity}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
