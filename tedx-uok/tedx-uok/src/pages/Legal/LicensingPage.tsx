import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export default function LicensingPage() {
  useSEO(seoConfig.licensing);

  return (
    <main className="bg-black w-full">
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#EB0028]">Licensing</span> Statement
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white leading-relaxed text-center">
            <p className="text-lg">
              TEDx UOK is an independently organized TEDx event operating under
              a license from TED Conferences LLC.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                About <span className="text-[#EB0028]">Our License</span>
              </h2>
              <p>
                TEDx is a program of local, self-organized events that bring
                people together to share a TED-like experience. At TEDx UOK, our
                event is organized by the University of Kelaniya community under
                a license granted by TED.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                Independent <span className="text-[#EB0028]">Organization</span>
              </h2>
              <p>
                While we operate under TED's brand and format guidelines, TEDx
                UOK is independently organized and operated. TED Conferences LLC
                does not control or endorse the specific content of our event,
                speakers, or presentations.
              </p>
            </div>

            {/* Content Guidelines - Card Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold !mb-6">
                Content <span className="text-[#EB0028]">Guidelines</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Scientific claims must be factual and backed by research
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    No promotion of commercial products or services
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    No pseudo-science, conspiracy theories, or zealotry
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300">
                  <p className="text-white text-left">
                    Content aims to educate and enlighten, not divide
                  </p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#EB0028]/20 transition-all duration-300 md:col-span-2">
                  <p className="text-white text-center">
                    Proper permissions obtained for copyrighted material
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold !mb-6">
                Speaker <span className="text-[#EB0028]">Responsibility</span>
              </h2>
              <p>
                Our speakers participate on a volunteer basis and are solely
                responsible for the content of their presentations. It is their
                responsibility to obtain any copyright permissions needed for
                third-party materials they use.
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
