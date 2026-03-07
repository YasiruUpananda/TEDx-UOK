import React from "react";

import Card from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import {
  Leaf,
  Droplets,
  Zap,
  Heart,
  Users,
  Ticket,
  Recycle,
  Ban,
  Bus,
  Globe,
  Utensils,
} from "lucide-react";
import Footer from "../../components/layout/Footer";

// Local Temporary Components
const PageHero = ({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <header className={`mb-12 text-center ${className}`}>
      <div className="overflow-hidden mb-2">
        <h1 className="text-4xl font-bold tracking-tight uppercase text-[#EB0028] animate-fade-in-up">
          {title}
        </h1>
      </div>
      {subtitle && (
        <div className="overflow-hidden">
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms] opacity-0">
            {subtitle}
          </p>
        </div>
      )}
    </header>
  );
};

// CountUp Component for Stats (unused)
/* const CountUp = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            if (progress < duration) {
              setCount(Math.min(end, Math.floor((progress / duration) * end)));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={nodeRef}>{count}</span>;
}; */

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

const ImpactPage = () => {
  useSEO(seoConfig.impact);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

    return (
        <div className="w-full min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="pt-24">
                <PageHero
                    title="Social Impact"
                    subtitle="Driving positive change through ideas and action."
                    className="animate-on-scroll opacity-0"
                />
            </div>

      {/* Impact Mission */}
      <Section className="text-center mb-16 animate-on-scroll opacity-0 w-full max-w-[1280px] mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            At TED<sup>x</sup>UOK, we believe that ideas have the power to
            change attitudes, lives, and ultimately, the world. Our social
            impact initiatives aim to foster sustainability, community growth,
            and inclusive dialogue, creating a ripple effect of positive change
            that extends far beyond our event.
          </p>
        </div>
      </Section>

      {/* Community Projects */}
      <Section className="mb-16 animate-on-scroll opacity-0 w-full max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white border-b border-[#EB0028] pb-2 inline-block">
          Community Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "Green Campus Initiative",
              img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
              description:
                "A student-led movement to reduce single-use plastics and implement better waste segregation systems.",
            },
            {
              id: 2,
              title: "Tech for Good",
              img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
              description:
                "Workshops and hackathons focused on developing open-source solutions for local non-profits.",
            },
            {
              id: 3,
              title: "Literacy Outreach",
              img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
              description:
                "Weekend mentorship programs where university volunteers help underprivileged school children.",
            },
          ].map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 150}ms` }}
              className="animate-on-scroll opacity-0 h-full"
            >
              <Card className="flex flex-col h-full hover:border-[#EB0028] transition-colors duration-300">
                {/* Image Placeholder with Grayscale Filter for Editorial Look */}
                <div className="h-48 bg-[#1a1a1a] rounded-lg mb-4 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#EB0028]">
                  {project.title}
                </h3>
                <p className="text-gray-300 font-light flex-grow">
                  {project.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Sustainability Practices */}
      <Section className="mb-16 animate-on-scroll opacity-0 w-full max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-white border-b border-[#EB0028] pb-2 inline-block">
          Sustainability Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Zero Waste Initiative Card */}
          <Card className="hover:border-[#EB0028] transition-colors duration-300 p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-[#EB0028]/10 text-[#EB0028]">
                  <Recycle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#EB0028]">
                  Zero Waste Initiative
                </h3>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: Ticket,
                    text: "Digital-first ticketing and program guides to minimize paper usage.",
                  },
                  {
                    icon: Utensils,
                    text: "Recyclable and compostable food containers throughout the venue.",
                  },
                  {
                    icon: Ban,
                    text: "Strict no-single-use-plastic policy for all vendors and attendees.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1 p-2 rounded-lg bg-[#1a1a1a] group-hover:bg-[#EB0028] transition-colors duration-300">
                      <item.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-300 font-light group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Eco-Friendly Venue Card */}
          <Card className="hover:border-[#EB0028] transition-colors duration-300 p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-[#EB0028]/10 text-[#EB0028]">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#EB0028]">
                  Eco-Friendly Venue
                </h3>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: Bus,
                    text: "Venue selected for optimal public transport accessibility.",
                  },
                  {
                    icon: Zap,
                    text: "Energy-efficient lighting and equipment to reduce carbon footprint.",
                  },
                  {
                    icon: Leaf,
                    text: "Carbon offset programs implemented for speaker travel.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1 p-2 rounded-lg bg-[#1a1a1a] group-hover:bg-[#EB0028] transition-colors duration-300">
                      <item.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-300 font-light group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Collaborations */}
      <Section className="mb-16 animate-on-scroll opacity-0 w-full max-w-[1280px] mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Our Partners in Change
          </h2>
          {/* Logo Grid: Ensuring consistent image ratios and professional spacing */}
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 items-center max-w-5xl mx-auto">
            {[
              { name: "EcoLanka", type: "Sustainability", Icon: Leaf },
              { name: "CleanOcean", type: "Environment", Icon: Droplets },
              { name: "EduTech", type: "Education", Icon: Zap },
              { name: "HealthFirst", type: "Well-being", Icon: Heart },
              { name: "SocialGen", type: "Community", Icon: Users },
            ].map((partner, index) => (
              <div
                key={index}
                className="group flex flex-col items-center animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Brand Asset Container: Styled as a professional Logo Pack */}
                <div className="w-24 h-24 flex items-center justify-center bg-[#1a1a1a] rounded-full border border-[#333] group-hover:border-[#EB0028] transition-colors duration-500">
                  <partner.Icon
                    strokeWidth={1.5}
                    className="w-10 h-10 text-gray-500 group-hover:text-[#EB0028] transition-colors duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="mb-16 animate-on-scroll opacity-0 w-full max-w-[1280px] mx-auto">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8 max-w-2xl mx-auto">
            Be a part of our mission to create a sustainable future. Whether you
            want to volunteer, partner with us, or simply learn more, we'd love
            to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/registration"
              className="px-8 py-3 bg-[#EB0028] text-white font-bold rounded-full hover:bg-white hover:text-[#EB0028] transition duration-300 text-center"
            >
              Become a Volunteer
            </a>
            <a
              href="/partners"
              className="px-8 py-3 border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition duration-300 text-center"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default ImpactPage;
