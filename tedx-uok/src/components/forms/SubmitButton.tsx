import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export const SubmitButton:  React.FC<SubmitButtonProps> = ({
  loading,
  children,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={`w-full bg-[#EB0028] text-white font-bold py-4 px-6 rounded-lg transition-all ${
        loading || disabled
          ?  'opacity-50 cursor-not-allowed'
          : 'hover:bg-[#c7001f] transform hover:scale-[1.02]'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};