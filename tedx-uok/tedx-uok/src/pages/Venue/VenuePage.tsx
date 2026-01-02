import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Card from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import { Bus, SquareParking, Users, Ticket } from "lucide-react";
import Loading from "../../components/states/Loading";
import Error from "../../components/states/Error";
import Empty from "../../components/states/Empty";

interface Venue {
  venue_id: string;
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  transport_info?: string;
  parking_info?: string;
  accessibility_info?: string;
  created_at?: string;
  google_maps_url?: string;
  google_maps_url_embd?: string;
  google_maps_dir_url?: string;
  entry_guidelines?: string;
}

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

const VenuePage: React.FC = () => {
  useSEO(seoConfig.venue);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded map URLs as defaults or fallbacks
  const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4094.3594164374313!2d79.91297847514686!3d6.9754031930253335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597c8dde7e47%3A0x341e7e820c46d3ed!2sUniversity%20of%20Kelaniya!5e1!3m2!1sen!2slk!4v1766409794367!5m2!1sen!2slk";
  const GOOGLE_MAPS_DIR_URL =
    "https://www.google.com/maps/dir//Administrative+Building,+Kandy+Rd,+Kelaniya+11600/@7.0647808,79.9637504,15041m/data=!3m2!1e3!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3ae2597c8dde7e47:0x341e7e820c46d3ed!2m2!1d79.9155534!2d6.9754032?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

  const fetchVenue = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase error while fetching venue:", error);
        setError("Failed to load venue information. Please try again later.");
      } else if (data && data.length > 0) {
        setVenue(data[0] as Venue);
      } else {
        setError("No venue information found.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Failed to load venue information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, []);

  useEffect(() => {
    // Only set up observer if not loading
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading, venue]); // Re-run when loading finishes or venue updates

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading label="Loading venue details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <Error message={error} onRetry={fetchVenue} />
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <Empty message="Venue information not available." />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* Inner container */}
      <div className="max-w-[1280px] mx-auto px-4 py-16 flex-grow w-full">
        {/* Header */}
        <header className="mb-12 text-center animate-on-scroll opacity-0">
          <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase text-[#EB0028]">
            {venue.name}
          </h1>
          <h3 className="text-4xl font-bold tracking-tight mb-2 uppercase">
            {venue.address_line_1}
          </h3>
          <p className="text-xl font-bold text-white">
            TED<sup className="text-[0.6em] relative -top-1">x</sup> UoK
          </p>
        </header>

        {/* Map Section */}
        <Section className="mb-12 w-full animate-on-scroll opacity-0">
          <div className="w-full rounded-xl overflow-hidden border border-[#1F1F1F] shadow-xl">
            <div className="h-[450px] w-full">
              <iframe
                src={venue.google_maps_url_embd || GOOGLE_MAPS_URL}
                title={`Map of ${venue.name}`}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Address and Directions */}
          <div className="flex justify-between items-center flex-wrap gap-4 mt-4">
            <div>
              <span className="font-bold">Address: </span>
              <span className="text-gray-300 font-light">
                {venue.address_line_1}
                {venue.address_line_2 && `, ${venue.address_line_2}`}
              </span>
            </div>
            <Button
              variant="tedxPrimary"
              onClick={() => {
                const url =
                  venue.google_maps_dir_url ||
                  venue.google_maps_url ||
                  GOOGLE_MAPS_DIR_URL;

                if (url) {
                  window.open(url, "_blank");
                }
              }}
              className="cursor-pointer"
            >
              Get Directions
            </Button>
          </div>
        </Section>

        {/* Venue Information */}
        <Section
          title="Venue Information"
          className="animate-on-scroll opacity-0"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Transport Info */}
            <Card className="group relative overflow-hidden border border-[#1F1F1F] bg-[#0a0a0a] hover:border-[#EB0028] transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(235,0,40,0.3)] hover:-translate-y-1 animate-on-scroll opacity-0">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#EB0028]/20 to-transparent text-[#EB0028] ring-1 ring-[#EB0028]/20 group-hover:scale-110 transition-transform duration-500">
                    <Bus className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#EB0028] transition-colors duration-300">
                    Transport Info
                  </h3>
                </div>
                <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {venue.transport_info || "Information not available"}
                </p>
              </div>
              {/* Decorative Watermark */}
              <Bus className="absolute -right-6 -bottom-6 w-32 h-32 text-[#EB0028]/5 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out pointer-events-none" />
            </Card>

            {/* Parking Info */}
            <div
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: "100ms" }}
            >
              <Card className="group relative overflow-hidden border border-[#1F1F1F] bg-[#0a0a0a] hover:border-[#EB0028] transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(235,0,40,0.3)] hover:-translate-y-1 h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#EB0028]/20 to-transparent text-[#EB0028] ring-1 ring-[#EB0028]/20 group-hover:scale-110 transition-transform duration-500">
                      <SquareParking className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#EB0028] transition-colors duration-300">
                      Parking
                    </h3>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {venue.parking_info || "Information not available"}
                  </p>
                </div>
                {/* Decorative Watermark */}
                <SquareParking className="absolute -right-6 -bottom-6 w-32 h-32 text-[#EB0028]/5 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out pointer-events-none" />
              </Card>
            </div>

            {/* Accessibility Info */}
            <div
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: "200ms" }}
            >
              <Card className="group relative overflow-hidden border border-[#1F1F1F] bg-[#0a0a0a] hover:border-[#EB0028] transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(235,0,40,0.3)] hover:-translate-y-1 h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#EB0028]/20 to-transparent text-[#EB0028] ring-1 ring-[#EB0028]/20 group-hover:scale-110 transition-transform duration-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#EB0028] transition-colors duration-300">
                      Accessibility
                    </h3>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {venue.accessibility_info || "Information not available"}
                  </p>
                </div>
                {/* Decorative Watermark */}
                <Users className="absolute -right-6 -bottom-6 w-32 h-32 text-[#EB0028]/5 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out pointer-events-none" />
              </Card>
            </div>

            {/* Entry Guidelines */}
            <div
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <Card className="group relative overflow-hidden border border-[#1F1F1F] bg-[#0a0a0a] hover:border-[#EB0028] transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(235,0,40,0.3)] hover:-translate-y-1 h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#EB0028]/20 to-transparent text-[#EB0028] ring-1 ring-[#EB0028]/20 group-hover:scale-110 transition-transform duration-500">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#EB0028] transition-colors duration-300">
                      Entry Guidelines
                    </h3>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {venue.entry_guidelines || "Information not available"}
                  </p>
                </div>
                {/* Decorative Watermark */}
                <Ticket className="absolute -right-6 -bottom-6 w-32 h-32 text-[#EB0028]/5 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out pointer-events-none" />
              </Card>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default VenuePage;
