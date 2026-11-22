import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <section className="overflow-hidden bg-[#eff3eb]">
        <div className="mx-auto grid min-h-[550px] max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-20">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
              <span className="size-2 rounded-full bg-emerald-700" /> Mua sắm có chọn lọc
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.08] tracking-[-0.05em] text-stone-900 sm:text-6xl">
              Những điều tốt lành, <span className="font-serif font-normal italic text-emerald-800">ngay trong tầm tay.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-stone-600 sm:text-lg">
              Khám phá những món đồ hữu ích cho cuộc sống thường ngày — được chọn lựa để mỗi lần mua sắm đều thật dễ dàng.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link className="rounded-full bg-emerald-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800" to="/products">
                Khám phá sản phẩm <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <span className="text-sm text-stone-500">Chọn điều bạn cần, yêu điều bạn chọn.</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[530px]">
            <div className="absolute -right-4 -top-7 size-32 rounded-full bg-[#d7dfcd]" />
            <div className="absolute -bottom-5 -left-7 size-36 rounded-full bg-[#e1cbb2]" />
            <img
              alt="Không gian mua sắm ấm áp với những sản phẩm được chọn lựa"
              className="relative aspect-[1/1.03] w-full rounded-[2rem] object-cover shadow-2xl shadow-emerald-950/10"
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
            />
            <div className="absolute -bottom-4 right-5 rounded-2xl bg-white px-5 py-4 shadow-xl sm:right-[-18px]">
              <p className="text-xs font-medium text-stone-500">Gợi ý từ mộc</p>
              <p className="mt-1 text-sm font-semibold text-stone-900">Đẹp trong từng điều nhỏ ✦</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Chào bạn đến với mộcmarket</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Mua sắm nhẹ nhàng, chọn lựa có ý nghĩa.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-stone-600">
            Chúng tôi tin rằng trải nghiệm tốt bắt đầu từ những lựa chọn giản dị. Dạo quanh bộ sưu tập sản phẩm đa dạng, tìm món đồ phù hợp và thêm vào giỏ chỉ với một chạm.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ['01', 'Dễ dàng khám phá', 'Tìm đúng sản phẩm với tìm kiếm và bộ lọc tiện lợi.'],
            ['02', 'Chọn lựa linh hoạt', 'Xem thông tin chi tiết trước khi quyết định.'],
            ['03', 'Giỏ hàng rõ ràng', 'Theo dõi số lượng và chi phí của bạn tức thì.'],
          ].map(([number, title, description]) => (
            <article className="rounded-2xl border border-stone-200 bg-white p-6" key={number}>
              <span className="text-xs font-bold tracking-widest text-emerald-800">{number}</span>
              <h3 className="mt-5 font-semibold text-stone-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
