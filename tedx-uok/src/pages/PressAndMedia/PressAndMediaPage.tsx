import {
  Download,
  FileText,
  Image as ImageIcon,
  Mail,
  Share2,
  Instagram,
  Twitter,
  Linkedin,
  FileArchive,
} from "lucide-react";

import { useSEO } from "../../hooks/useSEO";

const PressMedia = () => {
  useSEO({
    title: "Press & Media - Resources & Assets | TEDxUOK",
    description:
      "Access official press kits, logos, and media resources for TEDxUOK. Get the latest updates and information for journalists and content creators.",
  });
  const pressKitItems = [
    {
      id: 1,
      title: "Full Press Kit",
      description:
        "Complete media package including event details, speaker bios, and high-res images",
      size: "45 MB",
      icon: FileArchive,
      color: "bg-[#EB0028]/10",
      border: "border-[#EB0028]/20",
    },
    {
      id: 2,
      title: "Logo Pack",
      description: "All TEDxUoK logos in SVG, PNG, and EPS formats",
      size: "12 MB",
      icon: ImageIcon,
      color: "bg-[#0E0E0E]",
      border: "border-[#1F1F1F]",
    },
    {
      id: 3,
      title: "Brand Guidelines",
      description: "Complete visual identity guide and usage rules",
      size: "8 MB",
      icon: FileText,
      color: "bg-[#0E0E0E]",
      border: "border-[#1F1F1F]",
    },
    {
      id: 4,
      title: "Speaker Photos",
      description: "High-resolution headshots of all confirmed speakers",
      size: "62 MB",
      icon: ImageIcon,
      color: "bg-[#0E0E0E]",
      border: "border-[#1F1F1F]",
    },
  ];

  const mediaContacts = [
    {
      id: 1,
      name: "Press Inquiries",
      email: "press@tedxuok.com",
      role: "Media Relations Lead",
      icon: Mail,
    },
    {
      id: 2,
      name: "Partnerships",
      email: "partners@tedxuok.com",
      role: "Partnerships Director",
      icon: Share2,
    },
    {
      id: 3,
      name: "General Info",
      email: "info@tedxuok.com",
      role: "Event Coordinator",
      icon: Mail,
    },
  ];

  const socialMedia = [
    {
      id: 1,
      platform: "Instagram",
      handle: "@tedxuok",
      icon: Instagram,
      url: "https://instagram.com/tedxuok",
    },
    {
      id: 2,
      platform: "Twitter",
      handle: "@tedx_uok",
      icon: Twitter,
      url: "https://twitter.com/tedx_uok",
    },
    {
      id: 3,
      platform: "LinkedIn",
      handle: "TEDxUoK",
      icon: Linkedin,
      url: "https://linkedin.com/company/tedxuok",
    },
  ];

  const eventDetails = {
    name: "TEDxUOK 2025",
    theme: "Beyond Horizons",
    date: "October 25, 2025",
    time: "8:30 AM - 5:00 PM",
    venue: "Main Auditorium, University of Kelaniya",
    address: "Dalugama, Kelaniya 11600, Sri Lanka",
    capacity: "500 attendees",
    speakers: "12 thought leaders",
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Press & Media
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Resources and information for journalists, bloggers, and media
            professionals covering TED<sup>x</sup> UoK 2025.
          </p>
        </div>

        {/* Press Kit Download Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Press Kit & Assets</h2>
              <p className="text-gray-400 max-w-2xl">
                Download official media resources, logos, and event information.
                All assets are licensed for press use.
              </p>
            </div>
            <button className="mt-6 md:mt-0 bg-[#EB0028] text-white font-medium px-8 py-3.5 rounded-full hover:bg-[#d00024] transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 w-fit md:w-auto">
              <Download className="w-5 h-5" />
              Download All (127 MB)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressKitItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#0E0E0E] border border-[#1F1F1F] p-6 rounded-xl transition-all duration-500 hover:border-[#EB0028]/40 hover:shadow-[0_4px_20px_-2px_rgba(235,0,40,0.1)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${item.color} border ${item.border} transition-colors duration-300 group-hover:border-[#EB0028]/30`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.description}
                      </p>
                      <span className="text-gray-500 text-xs">{item.size}</span>
                    </div>
                  </div>
                  <button className="text-[#EB0028] hover:text-white bg-transparent border border-[#1F1F1F] hover:bg-[#EB0028] hover:border-[#EB0028] transition-all duration-300 p-2.5 rounded-lg">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Brief Section */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10">Event Brief</h2>

          <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-[#EB0028]">
                    TED<sup>x</sup>
                  </span>{" "}
                  UoK 2025
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  TED<sup>x</sup>UoK is an independently organized TED event at
                  the University of Kelaniya, bringing together thinkers,
                  innovators, and creators to share ideas worth spreading. Our
                  2025 theme "Beyond Horizons" explores the future of
                  technology, society, and human potential.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#EB0028] rounded-full"></div>
                    <span className="text-white font-medium">Theme:</span>
                    <span className="text-gray-400">{eventDetails.theme}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#EB0028] rounded-full"></div>
                    <span className="text-white font-medium">Speakers:</span>
                    <span className="text-gray-400">
                      {eventDetails.speakers}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#EB0028] rounded-full"></div>
                    <span className="text-white font-medium">Capacity:</span>
                    <span className="text-gray-400">
                      {eventDetails.capacity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">
                    Event Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-[#1F1F1F] pb-3">
                      <span className="text-gray-400">Date</span>
                      <span className="text-white font-medium">
                        {eventDetails.date}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1F1F1F] pb-3">
                      <span className="text-gray-400">Time</span>
                      <span className="text-white font-medium">
                        {eventDetails.time}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1F1F1F] pb-3">
                      <span className="text-gray-400">Venue</span>
                      <span className="text-white font-medium text-right">
                        {eventDetails.venue}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Address</span>
                      <span className="text-white font-medium text-right max-w-xs">
                        {eventDetails.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10">Media Contact</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 rounded-xl group hover:border-[#EB0028]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#EB0028]/10 border border-[#EB0028]/20">
                    <contact.icon className="w-5 h-5 text-[#EB0028]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {contact.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{contact.role}</p>
                  </div>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-[#EB0028] hover:text-white transition-colors duration-300 text-lg font-medium"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="mt-12 pt-10 border-t border-[#1F1F1F]">
            <h3 className="text-2xl font-bold text-white mb-6">Follow & Share</h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
              {socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group bg-[#1F1F1F]/30 px-4 py-2 rounded-full sm:bg-transparent sm:px-0 sm:py-0"
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-[#EB0028] transition-colors duration-300" />
                  <span className="font-medium text-sm sm:text-base">{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Facts Section */}
        <section className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 md:p-8 mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">Quick Facts</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "First TED<sup>x</sup>UoK Event", value: "2018" },
              { label: "Total Attendees (2024)", value: "450+" },
              { label: "Speakers Featured", value: "50+" },
              { label: "Countries Represented", value: "15+" },
            ].map((fact, index) => (
              <div
                key={index}
                className="text-center p-6 border border-[#1F1F1F] rounded-xl hover:border-[#EB0028]/40 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {fact.value}
                </div>
                <div
                  className="text-gray-400"
                  dangerouslySetInnerHTML={{ __html: fact.label }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center border-t border-[#1F1F1F] pt-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">Need Something Else?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            For interview requests, special access, or custom media packages,
            please reach out to our press team.
          </p>
          <a
            href="mailto:press@tedxuok.com"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#EB0028] text-[#EB0028] hover:bg-[#EB0028] hover:text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <Mail className="w-5 h-5" />
            Contact Press Team
          </a>
        </section>
      </div>
    </div>
  );
};

export default PressMedia;
