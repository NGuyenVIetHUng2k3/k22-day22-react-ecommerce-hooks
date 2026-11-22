interface LoadingProps {
  label?: string
}

function Loading({ label = 'Đang tải...' }: LoadingProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-sm font-medium text-stone-500" role="status">
      <span className="size-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
      {label}
    </div>
  )
}

export default Loading
