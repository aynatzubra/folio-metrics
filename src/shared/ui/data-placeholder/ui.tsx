import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faInbox, faRotateRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
  type: 'error' | 'empty'
  message: string
  className?: string
  onRetry?: () => void
}

export function DataPlaceholder({ type, message, className, onRetry }: Props) {
  const isError = type === 'error'

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <FontAwesomeIcon
        icon={isError ? faCircleExclamation : faInbox}
        className={`mb-3 h-10 w-10 ${isError ? 'text-red-500' : 'text-gray-300'}`}
      />
      <p className={`text-sm font-medium ${isError ? 'text-red-600' : 'text-gray-500'}`}>
        {message}
      </p>

      {isError && onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 text-xs font-semibold text-red-700 hover:text-red-800 transition"
        >
          <FontAwesomeIcon icon={faRotateRight} />
          Try Again
        </button>
      )}
    </div>
  )
}