import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PaymentCancelPage: React.FC = () => {

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
        @keyframes dash {
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
        .cancel-circle {
          stroke-dasharray: 240;
          stroke-dashoffset: 480;
          animation: circle 0.6s ease-in-out forwards;
        }
        .cancel-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: dash 0.6s 0.6s ease-in-out forwards;
        }
      `}</style>

      <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl sm:max-w-2xl mx-auto text-center w-full">
          {/* Cancel Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <svg className="w-24 h-24 sm:w-[120px] sm:h-[120px]" viewBox="0 0 120 120">
              <circle
                className="cancel-circle"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="4"
              />
              <line
                className="cancel-line"
                x1="35"
                y1="60"
                x2="85"
                y2="60"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white tracking-normal">
            Payment Cancelled
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 tracking-normal">
            Your payment has been cancelled and no charges were made.
          </p>

          <div className="bg-[#0E0E0E] border border-[#F59E0B] rounded-xl p-6 sm:p-8 mb-8 text-left">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#F59E0B] flex-shrink-0 mt-1 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-normal">
                  What happened?
                </h3>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  You cancelled the payment process before completion. Your registration has not been confirmed and no payment was processed.
                </p>
              </div>
            </div>
          </div>

          {/* Information Box */}
          <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 sm:p-6 mb-8 text-left text-center">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 tracking-normal">
              Want to complete your registration?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 tracking-normal">
              You can restart the registration process at any time. Your spot is not reserved until payment is completed.
            </p>
            <div className="flex items-center justify-center space-x-2 text-[#F59E0B]">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm tracking-normal">
                Seats are limited and available on a first-come, first-served basis
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-block bg-[#EB0028] px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-[#c7001f] transition-all text-white tracking-normal no-underline"
            >
              Complete Registration
            </Link>

            <Link
              to="/"
              className="inline-block bg-[#1F1F1F] border border-[#EB0028] px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-[#2F2F2F] transition-all text-white tracking-normal no-underline"
            >
              Return to Home
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/faq"
              className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg p-4 hover:border-[#EB0028] transition-all no-underline"
            >
              <h4 className="text-white font-bold mb-2 tracking-normal">
                Have Questions?
              </h4>
              <p className="text-gray-400 text-sm tracking-normal">
                Check our FAQ page
              </p>
            </Link>

            <Link
              to="/contact"
              className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg p-4 hover:border-[#EB0028] transition-all no-underline"
            >
              <h4 className="text-white font-bold mb-2 tracking-normal">
                Need Help?
              </h4>
              <p className="text-gray-400 text-sm tracking-normal">
                Contact our support team
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCancelPage;
