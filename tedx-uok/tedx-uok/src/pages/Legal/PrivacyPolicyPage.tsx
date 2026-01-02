import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export default function PrivacyPolicyPage() {
  useSEO(seoConfig.privacy);

  return (
    <main className="bg-black w-full">
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Privacy & <span className="text-[#EB0028]">Data Policy</span>
            </h1>
          </div>

          {/* Contented */}
          <div className="space-y-8 text-white leading-relaxed text-center">
            <p className="text-lg">
              TEDx UOK is committed to protecting your privacy. This policy
              explains how we collect, use, and safeguard your personal
              information.
            </p>

            {/* Information We Collect - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold !mb-6">
                Information <span className="text-[#EB0028]"> We Collect</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Name, email address, and phone number
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    University affiliation and student ID (if applicable)
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Volunteer application information
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Contact form submissions
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold !mb-6">
                How We Use
                <span className="text-[#EB0028]"> Your Information</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Process event registrations and ticket purchases
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Communicate event details and updates
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Manage volunteer applications
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Respond to inquiries and provide support
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300 md:col-span-2">
                  <p className="text-white text-left">
                    Improve our website and event experience
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                Data
                <span className="text-[#EB0028]"> Storage Security</span>
              </h2>
              <p>
                Your data is stored securely using industry-standard security
                measures. We implement appropriate technical and organizational
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            {/* Your Rights - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold !mb-6">
                Your <span className="text-[#EB0028]">Rights</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Access your personal data
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Correct inaccurate or incomplete data
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Request deletion of your data
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Opt-out of marketing communications
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300 md:col-span-2">
                  <p className="text-white text-left">
                    Withdraw consent at any time
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                Contact <span className="text-[#EB0028]">Us</span>
              </h2>
              <p>
                For privacy-related questions, contact us at{" "}
                <a
                  href="mailto:privacy@tedxuok.com"
                  className="!font-semibold hover:text-[#B09F8D] underline"
                >
                  privacy@tedxuok.com
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
