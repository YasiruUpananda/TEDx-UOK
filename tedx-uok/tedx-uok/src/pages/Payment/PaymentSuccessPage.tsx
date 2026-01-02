import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PaymentSuccessPage: React.FC = () => {
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
        @keyframes checkmark {
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
        .checkmark-circle {
          stroke-dasharray: 240;
          stroke-dashoffset: 480;
          animation: circle 0.6s ease-in-out forwards;
        }
        .checkmark-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmark 0.6s 0.6s ease-in-out forwards;
        }
      `}</style>

      <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl sm:max-w-2xl mx-auto text-center w-full">
          {/* Success Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <svg className="w-24 h-24 sm:w-[120px] sm:h-[120px]" viewBox="0 0 120 120">
              <circle
                className="checkmark-circle"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
              />
              <path
                className="checkmark-check"
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
                strokeLinecap="round"
                d="M34 60 L52 78 L86 44"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white tracking-normal">
            Payment Successful!
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 tracking-normal">
            Your registration for <span className="text-[#EB0028]">TED<sup className="text-[#EB0028]">x</sup></span> <span className="text-white">UoK</span> has been confirmed.
          </p>

          <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 sm:p-8 mb-8">
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  A confirmation email has been sent to your registered email address
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  Your ticket will be available in your email within 24 hours
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm sm:text-base text-gray-300 tracking-normal">
                  Please bring a valid ID and your ticket on the event day
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-[#EB0028] px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-[#c7001f] transition-all text-white tracking-normal no-underline"
            >
              Return to Home
            </Link>

            <Link
              to="/agenda"
              className="inline-block bg-[#1F1F1F] border border-[#EB0028] px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-[#2F2F2F] transition-all text-white tracking-normal no-underline"
            >
              View Event Agenda
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-gray-500 text-sm mb-2 tracking-normal">
              Questions about your registration?
            </p>
            <Link
              to="/contact"
              className="text-[#EB0028] hover:underline tracking-normal"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
