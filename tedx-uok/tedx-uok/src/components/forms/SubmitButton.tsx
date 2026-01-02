import React from 'react';

interface SubmitButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?:  boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300"
      style={{
        backgroundColor: '#EB0028',
        color:  '#FFFFFF',
        opacity: disabled || loading ? 0.5 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        letterSpacing: '0',
      }}
      onMouseEnter={(e) => {
        if (! disabled && !loading) {
          e.currentTarget.style.backgroundColor = '#c7001f';
          e.currentTarget. style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(235, 0, 40, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = '#EB0028';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            style={{ color: '#FFFFFF' }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span style={{ color: '#FFFFFF', letterSpacing: '0' }}>Processing...</span>
        </div>
      ) : (
        <span style={{ color: '#FFFFFF', letterSpacing: '0' }}>{children}</span>
      )}
    </button>
  );
};