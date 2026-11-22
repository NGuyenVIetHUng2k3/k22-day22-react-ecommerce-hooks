import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800">404 — Không tìm thấy trang</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">Có vẻ bạn đã đi lạc.</h1>
      <p className="mt-3 text-stone-500">Trang bạn tìm có thể đã được chuyển đi hoặc không tồn tại.</p>
      <Link className="mt-7 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800" to="/">Về trang chủ</Link>
    </section>
  )
}

export default NotFoundPage
