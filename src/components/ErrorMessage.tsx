interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-box" role="alert">
      <p>⚠️ {message}</p>
      {onRetry && (
        <button className="btn btn--small" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
