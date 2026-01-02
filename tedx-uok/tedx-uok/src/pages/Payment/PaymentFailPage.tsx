import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PaymentFailPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.backgroundColor = '#000000';

    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      <style>{`
        body, html, #root {
          background-color: #000000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        * {
          letter-spacing: 0 !important;
        }
        @keyframes xmark {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes circle {
          0% {
            stroke-dashoffset: 240;
          }
          100% {
            stroke-dashoffset: 480;
          }
        }
        .error-circle {
          stroke-dasharray: 240;
          stroke-dashoffset: 480;
          animation: circle 0.6s ease-in-out forwards;
        }
        .error-x {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: xmark 0.6s 0.6s ease-in-out forwards;
        }
      `}</style>

      <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl sm:max-w-2xl mx-auto text-center w-full">
          {/* Error Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <svg className="w-24 h-24 sm:w-[120px] sm:h-[120px]" viewBox="0 0 120 120">
              <circle
                className="error-circle"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#EB0028"
                strokeWidth="4"
              />
              <line
                className="error-x"
                x1="40"
                y1="40"
                x2="80"
                y2="80"
                stroke="#EB0028"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                className="error-x"
                x1="80"
                y1="40"
                x2="40"
                y2="80"
                stroke="#EB0028"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white tracking-normal">
            Payment Failed
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 tracking-normal">
            Unfortunately, we couldn't process your payment.
          </p>

          <div className="bg-[#0E0E0E] border border-[#EB0028] rounded-xl p-6 sm:p-8 mb-8 text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 tracking-normal">
              Common reasons for payment failure:
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-[#EB0028] flex-shrink-0">•</span>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  Insufficient funds in your account
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-[#EB0028] flex-shrink-0">•</span>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  Incorrect card details or expired card
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-[#EB0028] flex-shrink-0">•</span>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  Your bank declined the transaction
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-[#EB0028] flex-shrink-0">•</span>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  Network or connection issues
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-block bg-[#EB0028] px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-[#c7001f] transition-all text-white tracking-normal"
            >
              Try Again
            </button>

            <Link
              to="/register"
              className="inline-block bg-[#1F1F1F] border border-[#EB0028] px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-[#2F2F2F] transition-all text-white tracking-normal no-underline"
            >
              Return to Registration
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 tracking-normal">
                Need Help?
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 tracking-normal">
                If you continue to experience issues, please contact your bank or reach out to our support team.
              </p>
              <Link
                to="/contact"
                className="inline-block text-[#EB0028] hover:underline font-semibold text-sm sm:text-base tracking-normal"
              >
                Contact Support →
              </Link>
            </div>
          </div>

          {/* Home Link */}
          <div className="mt-8">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-300 transition-colors text-sm sm:text-base tracking-normal"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailPage;
