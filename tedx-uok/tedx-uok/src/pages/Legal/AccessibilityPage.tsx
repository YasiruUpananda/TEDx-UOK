import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

const TedX = () => (
  <span>
    TED<sup className="relative -top-1">x</sup> UoK
  </span>
);

export default function AccessibilityPage() {
  useSEO(seoConfig.accessibility);

  return (
    <main className="bg-black w-full">
      <section className="px-6 pt-24 pb-32">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#EB0028]">Accessibility</span> Statement
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white leading-relaxed text-center">
            <p className="text-lg">
              <TedX /> is committed to ensuring digital accessibility for people
              with disabilities. We are continually improving the user
              experience for everyone and applying the relevant accessibility
              standards.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                Our <span className="text-[#EB0028]">Commitment</span>
              </h2>
              <p>
                We strive to meet Web Content Accessibility Guidelines (WCAG)
                2.1 Level AA standards. Our website is designed to be compatible
                with assistive technologies such as screen readers, keyboard
                navigation, and voice recognition software.
              </p>
            </div>

            {/* Accessibility Features - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold !mb-6">
                Accessibility <span className="text-[#EB0028]">Features</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Alternative text for images
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Keyboard navigation support
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Clear and consistent navigation structure
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Sufficient color contrast ratios
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Resizable text without loss of functionality
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">Descriptive link text</p>
                </div>
              </div>
            </div>

            {/* Event Accessibility - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold !mb-6">
                Event <span className="text-[#EB0028]">Accessibility</span>
              </h2>
              <p>
                Our physical event at the University of Kelaniya is committed to
                being accessible to all attendees:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Wheelchair accessible venue with ramps and elevators
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Reserved seating for individuals with mobility needs
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Sign language interpretation available upon request
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Assistance animals welcome
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Accessible parking facilities
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Gender-neutral and accessible restrooms
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                Assistance <span className="text-[#EB0028]">Contact</span>
              </h2>
              <p>
                If you require specific accommodations to attend <TedX />,
                please contact us at least two weeks before the event.
              </p>
              <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 hover:border-[#EB0028]/20 transition-all duration-300">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <a
                    href="mailto:accessibility@tedxuok.com"
                    className="flex items-center gap-2 !font-semibold hover:text-[#B09F8D] transition-colors"
                  >
                    <span className="text-[#EB0028] mt-1">✉</span> accessibility@tedxuok.com
                  </a>
                  <a
                    href="tel:+94123456789"
                    className="flex items-center gap-2 !font-semibold hover:text-[#B09F8D] transition-colors"
                  >
                    <span className="text-[#EB0028]">📞</span> +94 123 456 789
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl !mb-6 font-semibold">Feedback</h2>
              <p>
                We welcome feedback on the accessibility of <TedX />. If you
                encounter any barriers or have suggestions for improvement,
                please contact us at{" "}
                <a
                  href="mailto:info@tedxuok.com"
                  className="!font-semibold hover:text-[#B09F8D] underline"
                >
                  info@tedxuok.com
                </a>
              </p>
            </div>

            <p className="text-sm text-white/50 pt-8 border-t border-[#1F1F1F]">
              Last updated: December 15, 2025
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
