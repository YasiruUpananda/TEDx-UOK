import React from "react";
import { Link } from "react-router-dom";

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export const VolunteerApplicationPage: React.FC = () => {
  useSEO(seoConfig.volunteerRegister);
  // Set body background to black when component mounts
  React.useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.backgroundColor = "#000000";

    return () => {
      // Cleanup when component unmounts
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const roles = [
    {
      title: "Logistics & Operations",
      description:
        "Coordinate event setup, manage venues, and ensure smooth operations on event day.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      title: "Marketing & Social Media",
      description:
        "Create engaging content, manage social platforms, and promote the event.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      ),
    },
    {
      title: "Technical Support",
      description:
        "Handle AV equipment, livestreaming, and technical troubleshooting.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: "Registration & Guest Services",
      description:
        "Welcome attendees, manage check-ins, and provide excellent customer service.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Content Creation",
      description:
        "Write articles, design graphics, and produce promotional materials.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
    },
    {
      title: "Photography & Videography",
      description:
        "Capture event moments, edit footage, and create visual stories.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
    },
  ];

  const commitments = [
    {
      period: "Pre-Event",
      duration: "2-4 hours/week",
      description:
        "Planning meetings, preparation tasks, and team coordination.",
    },
    {
      period: "Event Week",
      duration: "10-15 hours",
      description: "Final preparations, rehearsals, and setup activities.",
    },
    {
      period: "Event Day",
      duration: "8-10 hours",
      description: "Full day commitment for the main event execution.",
    },
    {
      period: "Post-Event",
      duration: "2-3 hours",
      description: "Wrap-up meetings, feedback sessions, and documentation.",
    },
  ];

  const skills = [
    "Communication & Teamwork",
    "Time Management",
    "Problem Solving",
    "Attention to Detail",
    "Flexibility & Adaptability",
    "Customer Service",
    "Technical Skills (for specific roles)",
    "Creative Thinking",
  ];

  const benefits = [
    {
      title: (
        <>
          TED<sup>x</sup> Experience
        </>
      ),
      description: (
        <>
          Be part of a globally recognized event and the TED<sup>x</sup>{" "}
          community.
        </>
      ),
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: "Networking",
      description:
        "Connect with speakers, organizers, and like-minded individuals.",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Skill Development",
      description: "Gain hands-on experience in event management and teamwork.",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      title: "Certificate",
      description: (
        <>
          Receive an official TED<sup>x</sup> volunteer certificate upon
          completion.
        </>
      ),
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
    {
      title: "Free Access",
      description:
        "Complimentary entry to the event and exclusive volunteer perks.",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      ),
    },
    {
      title: "Resume Builder",
      description: (
        <>
          Add prestigious TED<sup>x</sup> experience to your professional
          profile.
        </>
      ),
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

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
      `}</style>

      <div
        style={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="bg-black">
          {/* Hero Section */}
          <section className="bg-black py-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16"
                style={{ letterSpacing: "0" }}
              >
                <span style={{ color: "#FFFFFF" }}>Volunteer with </span>
                <span style={{ color: "#EB0028" }}>
                  TED<sup style={{ color: "#EB0028" }}>x</sup>
                </span>{" "}
                <span style={{ color: "#FFFFFF" }}>UoK</span>
              </h1>
              <p
                className="text-gray-300 text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ letterSpacing: "0" }}
              >
                Join our passionate team and help create an unforgettable
                experience. Make an impact, build connections, and grow your
                skills.
              </p>
              <Link
                to="/volunteer/register"
                className="inline-block bg-[#EB0028] px-10 py-4 rounded-lg text-lg font-bold hover:bg-[#c7001f] transition-all shadow-lg hover:shadow-xl"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Apply Now
              </Link>
            </div>
          </section>

          {/* Roles Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-center mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Volunteer <span style={{ color: "#EB0028" }}>Roles</span>
              </h2>
              <p
                className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
                style={{ letterSpacing: "0" }}
              >
                Discover the various roles available and find the perfect fit
                for your skills and interests.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 hover:border-[#EB0028] transition-all"
                  >
                    <div className="text-white mb-4">{role.icon}</div>
                    <h3
                      className="text-xl font-bold text-white mb-3"
                      style={{ letterSpacing: "0" }}
                    >
                      {role.title}
                    </h3>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ letterSpacing: "0" }}
                    >
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Time Commitments Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-center mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Time <span style={{ color: "#EB0028" }}>Commitments</span>
              </h2>
              <p
                className="text-gray-400 text-center mb-12"
                style={{ letterSpacing: "0" }}
              >
                Understand the time investment required throughout the event
                lifecycle.
              </p>

              <div className="space-y-4">
                {commitments.map((commitment, index) => (
                  <div
                    key={index}
                    className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="mb-4 sm:mb-0 flex-1">
                      <h3
                        className="text-xl font-bold text-white mb-2"
                        style={{ letterSpacing: "0", textAlign: "left" }}
                      >
                        {commitment.period}
                      </h3>
                      <p
                        className="text-gray-400 text-sm"
                        style={{ letterSpacing: "0", textAlign: "left" }}
                      >
                        {commitment.description}
                      </p>
                    </div>
                    <div className="sm:ml-6 flex-shrink-0">
                      <span
                        className="inline-block bg-[#EB0028] px-6 py-2 rounded-lg text-sm font-bold whitespace-nowrap"
                        style={{
                          color: "#FFFFFF",
                          letterSpacing: "0",
                          minWidth: "160px",
                          textAlign: "center",
                        }}
                      >
                        {commitment.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Required Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-center mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Skills <span style={{ color: "#EB0028" }}>Required</span>
              </h2>
              <p
                className="text-gray-400 text-center mb-12"
                style={{ letterSpacing: "0" }}
              >
                We're looking for motivated individuals with these skills and
                qualities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg p-4 flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-[#EB0028] rounded-full flex-shrink-0"></div>
                    <span
                      className="text-gray-300"
                      style={{ letterSpacing: "0" }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-center mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Volunteer <span style={{ color: "#EB0028" }}>Benefits</span>
              </h2>
              <p
                className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
                style={{ letterSpacing: "0" }}
              >
                Beyond the experience, enjoy these exclusive benefits as a TED
                <sup style={{ color: "#EB0028" }}>x</sup> UoK volunteer.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl p-6 text-center hover:border-[#EB0028] transition-all"
                  >
                    <div className="text-white mb-4 flex justify-center">
                      {benefit.icon}
                    </div>
                    <h3
                      className="text-xl font-bold text-white mb-3"
                      style={{ letterSpacing: "0" }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ letterSpacing: "0" }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-4 bg-black">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Ready to Make an{" "}
                <span style={{ color: "#EB0028" }}>Impact? </span>
              </h2>
              <p
                className="text-gray-300 text-lg mb-10"
                style={{ letterSpacing: "0" }}
              >
                Applications are open! Join our volunteer team and be part of
                something extraordinary.
              </p>
              <Link
                to="/volunteer/register"
                className="inline-block bg-[#EB0028] px-12 py-5 rounded-lg text-xl font-bold hover:bg-[#c7001f] transition-all shadow-lg hover:shadow-xl"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Apply to Volunteer
              </Link>
              <p
                className="text-gray-500 text-sm mt-8"
                style={{ letterSpacing: "0" }}
              >
                Questions?{" "}
                <Link
                  to="/contact"
                  style={{
                    color: "#EB0028",
                    textDecoration: "none",
                    letterSpacing: "0",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Contact us
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default VolunteerApplicationPage;
