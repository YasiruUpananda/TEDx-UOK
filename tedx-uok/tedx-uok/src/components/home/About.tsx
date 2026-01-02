import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

interface props {
  description: string | null;
}

const About = ({ description }: props) => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              About The Event
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ideas that inspire, connect, and transform
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {description ||
                "TEDxUOK brings together thought leaders, innovators, and change-makers to share ideas worth spreading. Join us for a day of inspiring talks, meaningful connections, and transformative experiences."}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              As an independently organized TEDx event, we follow the spirit of
              TED's mission to spread ideas that matter. This event is about
              sparking deep discussion and fostering connections among
              attendees.
            </p>
            <Link to="/about">
              <Button variant="tedxSecondary" size="lg">
                Learn More About TEDx
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-lg p-6">
              <span className="text-4xl md:text-5xl font-bold text-primary">
                10+
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                Inspiring Speakers
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <span className="text-4xl md:text-5xl font-bold text-foreground">
                500+
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                Expected Attendees
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <span className="text-4xl md:text-5xl font-bold text-foreground">
                1
              </span>
              <p className="text-sm text-muted-foreground mt-2">Day of Ideas</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <span className="text-4xl md:text-5xl font-bold text-foreground">
                ∞
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                Impact Created
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
