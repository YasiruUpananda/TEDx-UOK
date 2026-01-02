import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

interface props {
  date: string | null;
  venue: string | null;
  theme: string | null;
  ctaLabel?: string;
  ctaLink?: string;
}

const Hero = ({ date, venue, theme, ctaLabel, ctaLink }: props) => {
  const eventDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date To Be Announced";

  const eventVenue = venue || "Venue To Be Annouced";
  const eventTheme = theme || "Theme To Be Annouced";
  const primaryLabel = ctaLabel || "Register Now";
  const primaryLink = ctaLink || "/register";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Subtle Red Accent Line */}
      <div className="absolute left-0 top-1/4 w-1 h-32 bg-primary" />

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Event Badge */}
            <div className="inline-flex items-center gap-2 mb-8 opacity-0 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Independently Organized TEDx Event
              </span>
            </div>

            {/* Main Title */}
            <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 opacity-0 animate-fade-in-up animation-delay-100">
              <span className="text-primary">TED</span>
              <span className="text-primary absolute top-[-20%] ">x</span>
              <span className="opacity-0">x</span>
              <span className="text-foreground "> UoK</span>
            </h1>

            {/* Theme */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-8 opacity-0 animate-fade-in-up animation-delay-200">
              {eventTheme}
            </h2>

            {/* Event Details */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 opacity-0 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-3">
                <div className="w-px h-8 bg-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Date
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    {eventDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Venue
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    {eventVenue}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-400">
              <Link to={primaryLink}>
                <Button variant="tedxPrimary" size="xl">
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="tedxSecondary" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Element - TEDx */}
          <div className="hidden lg:flex items-center justify-center relative opacity-0 animate-fade-in animation-delay-300">
            <div className="relative w-full aspect-square max-w-lg">
              {/* TEDx Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative text-[12rem] xl:text-[14rem] font-bold select-none leading-none tracking-tighter">
                  <span className="text-primary/20">TED</span>
                  <span className="text-primary/10 absolute top-[-20%]">x</span>
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 right-0 w-24 h-px bg-primary/30" />
              <div className="absolute bottom-1/4 left-0 w-24 h-px bg-border" />
              <div className="absolute top-0 left-1/4 w-px h-24 bg-border" />
              <div className="absolute bottom-0 right-1/4 w-px h-24 bg-primary/30" />

              {/* Corner Accents */}
              <div className="absolute top-8 right-8 w-16 h-16 border border-border rounded-lg" />
              <div className="absolute bottom-8 left-8 w-12 h-12 border border-primary/30 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
