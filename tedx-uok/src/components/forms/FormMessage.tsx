import React from 'react';

interface FormMessageProps {
  type:  'success' | 'error';
  message: string;
  onClose?:  () => void;
}

export const FormMessage: React.FC<FormMessageProps> = ({
  type,
  message,
  onClose,
}) => {
  return (
    <div
      className={`p-4 rounded-lg border animate-fadeIn ${
        type === 'success'
          ? 'bg-green-900/20 border-green-500 text-green-400'
          : 'bg-red-900/20 border-red-500 text-red-400'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {type === 'success' ?  (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <span className="text-sm font-medium">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};