interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="my-10 rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center" role="alert">
      <p className="font-semibold text-red-900">Không thể tải dữ liệu</p>
      <p className="mt-2 text-sm text-red-800">{message}</p>
      {onRetry && (
        <button
          className="mt-5 rounded-xl bg-red-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          onClick={onRetry}
          type="button"
        >
          Thử lại
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
