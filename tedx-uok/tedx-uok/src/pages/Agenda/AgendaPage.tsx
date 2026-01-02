import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, Clock, MapPin, Mic } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface AgendaItem {
  agenda_item_id: string;
  event_id: string;
  start_time: string;
  end_time: string;
  title: string;
  type: "Opening" | "Talk" | "Break" | "Closing" | "Performance" | "Networking";
  speaker_id?: string;
  description?: string;
  display_order: number;
  speakers?: {
    full_name: string;
    title: string;
    organization?: string;
  };
}

interface EventDetails {
  event_id: string;
  name: string;
  date: string;
  venue?: {
    name: string;
  };
}

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

const AgendaPage = () => {
  useSEO(seoConfig.agenda);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle Window Resize to switch animation styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    fetchAgendaData();
  }, []);

  const fetchAgendaData = async () => {
    try {
      setLoading(true);

      // Fetch current active event
      const { data: settingsData } = await supabase
        .from("settings")
        .select("current_event_id")
        .single();

      if (!settingsData?.current_event_id) return;

      // Fetch event details
      const { data: eventData } = await supabase
        .from("events")
        .select(
          `
          event_id,
          name,
          date,
          venues (
            name
          )
        `
        )
        .eq("event_id", settingsData.current_event_id)
        .single();

      setEventDetails(eventData);

      // Fetch agenda items with speaker info
      const { data: agendaData, error } = await supabase
        .from("agenda_items")
        .select(
          `
          *,
          speakers (
            full_name,
            title,
            organization
          )
        `
        )
        .eq("event_id", settingsData.current_event_id)
        .order("display_order", { ascending: true });

      if (error) throw error;

      setAgendaItems(agendaData || []);
    } catch (err: any) {
      console.error("Error fetching agenda data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="relative bg-black text-white min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB0028] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading agenda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white min-h-screen pt-24 pb-20 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center select-none">
        <div className="relative opacity-[0.02] transform -rotate-12 scale-150 sm:scale-100">
          <div className="flex items-baseline leading-none font-bold">
            <span className="text-[40vw] text-white tracking-tighter">TED</span>
            <span className="text-[40vw] text-[#EB0028]">x</span>
          </div>
          <div className="text-[15vw] text-white font-bold text-right -mt-[5vw] mr-[4vw]">
            UoK
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-down">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Agenda
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 text-gray-400 mt-8">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#EB0028]/50 transition-all duration-300">
              <Calendar className="text-[#EB0028] w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                {eventDetails ? formatDate(eventDetails.date) : "Coming Soon"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#EB0028]/50 transition-all duration-300">
              <MapPin className="text-[#EB0028] w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                {eventDetails?.venue?.name || "Venue to be announced"}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#EB0028]/40 via-[#EB0028]/30 to-[#EB0028]/20"></div>

          {/* Left Line - Mobile */}
          <div className="md:hidden absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EB0028]/40 via-[#EB0028]/30 to-[#EB0028]/20"></div>

          {agendaItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Agenda will be announced soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8 sm:space-y-12">
              {agendaItems.map((item, index) => {
                const isLeft = index % 2 === 0;

                // On mobile, always fade up. On desktop, zig-zag.
                const aosAnimation = isMobile
                  ? "fade-up"
                  : (isLeft ? "fade-right" : "fade-left");

                return (
                  <div
                    key={item.agenda_item_id}
                    className={`relative flex flex-col md:flex-row items-center md:justify-between w-full ${isLeft ? "" : "md:flex-row-reverse"
                      }`}
                    data-aos={aosAnimation}
                    data-aos-delay={index * 100}
                  >
                    {/* Content Card */}
                    <div
                      className={`w-full md:w-[45%] pl-12 sm:pl-16 md:pl-0 ${isLeft
                          ? "md:pr-8 lg:pr-12 md:text-right"
                          : "md:pl-8 lg:pl-12 md:text-left"
                        }`}
                    >
                      <div className="group relative bg-[#0E0E0E] border border-[#1F1F1F] p-6 sm:p-8 rounded-xl transition-all duration-500 hover:border-[#EB0028]/40 hover:shadow-[0_4px_20px_-2px_rgba(235,0,40,0.1)]">
                        {/* Time Badge */}
                        <div
                          className={`inline-flex items-center gap-2 text-[#EB0028] text-xs sm:text-sm mb-4 bg-[#EB0028]/10 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 group-hover:bg-[#EB0028]/15 ${isLeft ? "md:ml-auto" : ""
                            }`}
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          {formatTime(item.start_time)}
                          {item.end_time && ` - ${formatTime(item.end_time)}`}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5 transition-colors duration-300 group-hover:text-gray-100">
                          {item.title}
                        </h3>

                        {/* Content Area */}
                        <div className="space-y-3">
                          {/* Speaker Info */}
                          {item.speaker_id && item.speakers && (
                            <div
                              className={`flex items-center gap-3 text-white font-medium text-base sm:text-lg transition-opacity duration-500 ${isLeft ? "md:flex-row-reverse" : ""
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-1.5 sm:p-2 rounded-full bg-[#EB0028]/10 transition-all duration-300 group-hover:bg-[#EB0028]/20">
                                  <Mic className="w-3 h-3 sm:w-4 sm:h-4 text-[#EB0028]" />
                                </div>
                                <div
                                  className={`text-left ${isLeft ? "md:text-right" : ""
                                    }`}
                                >
                                  <div className="leading-tight">
                                    {item.speakers.full_name}
                                  </div>
                                  <div className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-tight">
                                    {item.speakers.title}
                                    {item.speakers.organization &&
                                      `, ${item.speakers.organization}`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {!item.speaker_id && (
                            <div className="text-gray-400 italic text-sm sm:text-base transition-opacity duration-500 md:group-hover:opacity-0">
                              {item.type === "Break"
                                ? "Break"
                                : ""}
                            </div>
                          )}

                          {/* Description */}
                          <div className="hidden md:block opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {item.description ||
                                `A ${item.type.toLowerCase()} session.`}
                            </p>
                          </div>

                          {/* Description - Always visible on mobile */}
                          <div className="md:hidden mt-4 pt-4 border-t border-[#1F1F1F]">
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {item.description ||
                                `A ${item.type.toLowerCase()} session.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-4 sm:left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-black border-2 md:border-[3px] border-[#EB0028] z-10 mt-8 sm:mt-6 md:mt-0 max-md:top-0 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(235,0,40,0.5)] shadow-[0_0_10px_rgba(235,0,40,0.3)]">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white rounded-full"></div>
                    </div>

                    {/* Spacer for Flex Layout */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;