import { Play, Users, Image as ImageIcon, Calendar } from "lucide-react";

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export default function PastEventsPage() {
  useSEO(seoConfig.pastEvents);
  const pastEvents = [
    {
      year: "2023",
      theme: "Uncharted Territories",
      speakerCount: 8,
      talksCount: 8,
      hasGallery: true,
      playlistUrl: "#",
    },
    {
      year: "2022",
      theme: "Beyond Barriers",
      speakerCount: 6,
      talksCount: 6,
      hasGallery: true,
      playlistUrl: "#",
    },
    {
      year: "2021",
      theme: "Resilience",
      speakerCount: 5,
      talksCount: 5,
      hasGallery: false,
      playlistUrl: "#",
    },
  ];

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            <section className="py-10 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 transition-all duration-300">Past Events</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                        Explore our history of spreading ideas.
                    </p>
                </div>

                <div className="space-y-16">
                    {pastEvents.map((event, index) => (
                        <div key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300">
                            <div className="p-5 sm:p-8 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 sm:gap-6">
                                    <div className="w-full md:w-auto">
                                        <div className="flex items-center text-primary font-bold text-lg sm:text-xl mb-2">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                            {event.year}
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Theme: {event.theme}</h2>
                                    </div>
                                    <a
                                        href={event.playlistUrl}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium text-sm w-full md:w-auto"
                                    >
                                        <Play className="w-4 h-4 mr-2" />
                                        Watch Talks
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Stats Placeholder */}
                                    <div className="bg-background/50 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:space-x-8 space-y-3 sm:space-y-0 border border-border/50">
                                        <div className="flex items-center text-muted-foreground">
                                            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                                            <span className="text-sm sm:text-base">{event.speakerCount} Speakers</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                                            <span className="text-sm sm:text-base">{event.talksCount} Talks</span>
                                        </div>
                                    </div>

                  {/* Gallery Placeholder */}
                  <div className="bg-background/50 rounded-lg p-6 flex items-center justify-center border border-border/50 min-h-[120px]">
                    {event.hasGallery ? (
                      <div className="flex items-center text-muted-foreground/50">
                        <ImageIcon className="w-8 h-8 mr-3" />
                        <span>Event Gallery Placeholder</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground/30 italic">
                        No gallery available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-border pt-10">
          <p className="text-muted-foreground italic">
            * This archive is currently being updated. More events and details
            will be added soon.
          </p>
        </div>
      </section>
    </div>
  );
}
