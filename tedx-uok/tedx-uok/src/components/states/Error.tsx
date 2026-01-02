export default function Error({ message = 'Something went wrong.', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="py-6 text-center text-white/60">
      <div className="mb-3">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary">
          Retry
        </button>
      )}
    </div>
  );

}
