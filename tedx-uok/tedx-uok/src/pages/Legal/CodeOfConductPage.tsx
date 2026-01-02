import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export default function CodeOfConductPage() {
  useSEO(seoConfig.codeOfConduct);

  return (
    <main className="bg-black w-full">
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Code of <span className="text-[#EB0028]">Conduct</span>
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white leading-relaxed text-center">
            <p className="text-lg">
              We invite you to join TEDx UOK in a spirit of curiosity,
              friendliness, open-mindedness, and respect. We will not tolerate
              harassment, in any form, at a TEDx UOK event.
            </p>

            {/* At TEDx UOK, You Agree To - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white !mb-6">
                At TEDx UOK,
                <span className="text-[#EB0028]"> You Agree To:</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Respect the boundaries of other attendees
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Avoid aggressively pushing your own services, products, or
                    causes
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Respect confidentiality requests by speakers and other
                    attendees
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Look out for one another
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Contribute to an inclusive event experience through
                    respectful interactions
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Follow health and safety guidelines provided by event
                    organizers
                  </p>
                </div>
              </div>
            </div>

            {/* Unacceptable Behavior - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white !mb-6">
                Unacceptable <span className="text-[#EB0028]">Behavior</span>
              </h2>
              <p>These behaviors don't belong at TEDx UOK:</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Invasion of privacy or taking photos without permission
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Posting personal details about someone else without
                    permission
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Disruptive behavior, excessive drinking, stalking, or
                    threatening anyone
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Abuse of power related to position, wealth, race, or gender
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Ignoring health or safety guidelines
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Discrimination or harassment of any kind
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300 md:col-span-2">
                  <p className="text-white text-center">
                    Sexual harassment or inappropriate physical contact
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white !mb-6">
                Reporting <span className="text-[#EB0028]">Violations</span>
              </h2>
              <p>
                If you experience or witness behavior that violates this Code of
                Conduct, please report it immediately to a TEDx UOK organizer or
                email{" "}
                <a
                  href="mailto:conduct@tedxuok.com"
                  className="!font-semibold hover:text-[#B09F8D] underline"
                >
                  conduct@tedxuok.com
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
