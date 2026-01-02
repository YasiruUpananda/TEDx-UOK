import React from 'react';

interface FormMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

export const FormMessage: React.FC<FormMessageProps> = ({
  type,
  message,
  onClose,
}) => {
  const isSuccess = type === 'success';

  return (
    <div
      className={`p-4 rounded-lg border border-solid ${isSuccess
          ? 'bg-[#22c55e]/10 border-[#22c55e]'
          : 'bg-[#EB0028]/10 border-[#EB0028]'
        }`}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <svg
              className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#22c55e]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#EB0028]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <p className={`text-sm tracking-normal ${isSuccess ? 'text-[#22c55e]' : 'text-[#EB0028]'}`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 transition-opacity hover:opacity-70 ${isSuccess ? 'text-[#22c55e]' : 'text-[#EB0028]'}`}
            aria-label="Close message"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};