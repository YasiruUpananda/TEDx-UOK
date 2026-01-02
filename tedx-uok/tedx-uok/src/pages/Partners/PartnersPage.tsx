import React, { useState, useEffect } from "react";
import { Linkedin, Crown, Medal, HandHeart } from "lucide-react";
import { sharedStyles } from "../../utils/constants";
import { supabase } from "../../lib/supabase";
import { getSupabaseStorageUrl } from "../../lib/utils";
import Loading from "../../components/ui/Loading";
import { useSEO } from "../../hooks/useSEO";

interface Partner {
  id: string;
  name: string;
  tier: "Title" | "Gold" | "Silver" | "Bronze" | "In-kind";
  logo_url: string;
  linkedin_url?: string;
  isActive?: boolean;
}

const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  useSEO({
    title: "Our Partners - Collaborators & Supporters | TEDxUOK",
    description:
      "Explore the esteemed partners of TEDxUOK, showcasing our valued collaborators across Title, Gold, Silver, Bronze, and In-kind tiers.",
  });

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching partners:", error);
      } else {
        const partnerBucket =
          (import.meta.env.VITE_SUPABASE_BUCKET_PARTNER_LOGOS as string) ||
          "partner-logos";
        const mappedPartners: Partner[] = (data || []).map((p: any) => ({
          id: p.partner_id?.toString() || "",
          name: p.name || "",
          tier: (p.tier as Partner["tier"]) || "Bronze",
          logo_url: p.logo_url
            ? String(p.logo_url).startsWith("http") ||
              String(p.logo_url).startsWith("/")
              ? String(p.logo_url)
              : getSupabaseStorageUrl(partnerBucket, String(p.logo_url))
            : "",
          linkedin_url: p.website_url || undefined, // assuming website_url is linkedin
          isActive: p.is_active ?? true,
        }));
        setPartners(mappedPartners);
      }

      setLoading(false);
    };

    fetchPartners();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const activePartners = partners.filter((p) => p.isActive ?? true);

  const partnersByTier = {
    Title: activePartners.filter((p) => p.tier === "Title"),
    Gold: activePartners.filter((p) => p.tier === "Gold"),
    Silver: activePartners.filter((p) => p.tier === "Silver"),
    Bronze: activePartners.filter((p) => p.tier === "Bronze"),
    "In-kind": activePartners.filter((p) => p.tier === "In-kind"),
  };

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "Title":
        return {
          borderColor: "border-yellow-400",
          bgGradient: "from-yellow-400/10 to-yellow-600/5",
          accentColor: "text-yellow-400",
          icon: <Crown className="w-6 h-6" />,
        };
      case "Gold":
        return {
          borderColor: "border-yellow-500",
          bgGradient: "from-yellow-500/10 to-yellow-700/5",
          accentColor: "text-yellow-500",
          icon: <Medal className="w-6 h-6" />,
        };
      case "Silver":
        return {
          borderColor: "border-gray-400",
          bgGradient: "from-gray-400/10 to-gray-600/5",
          accentColor: "text-gray-400",
          icon: <Medal className="w-6 h-6" />,
        };
      case "Bronze":
        return {
          borderColor: "border-amber-600",
          bgGradient: "from-amber-600/10 to-amber-800/5",
          accentColor: "text-amber-600",
          icon: <Medal className="w-6 h-6" />,
        };
      case "In-kind":
        return {
          borderColor: "border-blue-400",
          bgGradient: "from-blue-400/10 to-blue-600/5",
          accentColor: "text-blue-400",
          icon: <HandHeart className="w-6 h-6" />,
        };
      default:
        return {
          borderColor: "border-gray-600",
          bgGradient: "from-gray-600/10 to-gray-800/5",
          accentColor: "text-gray-400",
          icon: <Medal className="w-6 h-6" />,
        };
    }
  };

  const renderPartnerTier = (tier: string, tierPartners: Partner[]) => {
    if (!tierPartners.length) return null;

    const tierStyles = getTierStyles(tier);

    return (
      <section
        className="mb-20"
        aria-labelledby={`${tier.toLowerCase()}-partners`}
      >
        <div className="flex items-center justify-between mb-10">
          <h2
            id={`${tier.toLowerCase()}-partners`}
            className={`${sharedStyles.typography.sectionTitle} flex items-center gap-3`}
          >
            <span className="text-2xl">{tierStyles.icon}</span>
            {tier} Partners
          </h2>
        </div>
        <div className={sharedStyles.layout.partnerGrid}>
          {tierPartners.map((partner) => (
            <div
              key={partner.id}
              className={`${sharedStyles.card.base} bg-gradient-to-br ${tierStyles.bgGradient} ${tierStyles.borderColor} border-2 hover:border-opacity-80 transition-all duration-300 group`}
            >
              <div
                className={`${sharedStyles.partner.imageContainer} relative overflow-hidden`}
              >
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className={`${sharedStyles.partner.logoMaxHeight} object-contain transition-transform duration-300 group-hover:scale-110`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/200x100/e8e2dc/666666?text=No+Logo";
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {partner.linkedin_url && (
                  <a
                    href={partner.linkedin_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${partner.name} LinkedIn page`}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
              <div className={`${sharedStyles.card.content} space-y-1`}>
                <h3
                  className={`${sharedStyles.typography.cardTitle} flex items-center gap-2`}
                >
                  <span>{partner.name}</span>
                </h3>
                <p className={`${tierStyles.accentColor} mt-1 font-medium`}>
                  {tier} Partner
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}

      <section className={sharedStyles.layout.heroSection}>
        <div
          className={`${sharedStyles.layout.heroContainer} ${sharedStyles.layout.heroFlex}`}
        >
          <div>
            <h1 className={sharedStyles.typography.brandTitle}>
              <span className={sharedStyles.colors.tedxRed}>
                TED<sup>x</sup>
              </span>
              <span className={sharedStyles.colors.white}> UoK</span>
            </h1>
            <h2
              className={`${sharedStyles.typography.heroTitle} ${sharedStyles.colors.white} mt-5`}
            >
              Partners
            </h2>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-[#EB0028] to-transparent"></div>
          </div>

          <div className={sharedStyles.layout.heroAside}>
            <p className={sharedStyles.typography.heroDescriptionDark}>
              Tiered showcases and equal spotlight for every collaborator.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent max-w-7xl mx-auto" />

      {/* Partners Grid */}
      <section className={sharedStyles.layout.contentSection}>
        <div className={sharedStyles.layout.pageStack}>
          {renderPartnerTier("Title", partnersByTier.Title)}
          {renderPartnerTier("Gold", partnersByTier.Gold)}
          {renderPartnerTier("Silver", partnersByTier.Silver)}
          {renderPartnerTier("Bronze", partnersByTier.Bronze)}
          {renderPartnerTier("In-kind", partnersByTier["In-kind"])}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(235,0,40,0.05),transparent_70%)]"></div>
        <div
          className={`${sharedStyles.layout.pageContainer} text-center relative z-10`}
        >
          <div className="inline-flex items-center gap-2 bg-[#EB0028]/10 text-[#EB0028] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#EB0028] rounded-full animate-pulse"></span>
            More partners to be announced
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            Join us at{" "}
            <span className={sharedStyles.colors.tedxRed}>
              TED<sup>x</sup>
            </span>
            <span className={sharedStyles.colors.black}> UoK</span> 2026
          </h2>
          <button className="bg-gradient-to-r from-[#EB0028] to-[#d10022] text-white px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium rounded-lg hover:from-[#d10022] hover:to-[#b8001e] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Register Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default PartnersPage;
