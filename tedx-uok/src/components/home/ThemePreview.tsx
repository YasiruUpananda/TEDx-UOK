import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

interface Props {
  theme?: string | null;
  description?: string | null;
}

const subPillars = [
  {
    title: "Innovation",
    description: "Pushing boundaries and challenging conventional thinking.",
  },
  {
    title: "Resilience",
    description: "Building strength through adversity and emerging stronger.",
  },
  {
    title: "Connection",
    description: "Bridging gaps between communities and perspectives.",
  },
];

export function ThemePreview({ theme, description }: Props) {
  const displayTheme = theme || "Theme To Be Announced";
  const displayDesc =
    description ||
    "Exploring the edges of possibility and the courage to venture beyond.";

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              2026 Theme
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              {displayTheme}
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {displayDesc}
            </p>

            <Link to="/theme">
              <Button variant="tedxSecondary" size="lg">
                Explore the Theme
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {subPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="flex gap-6 p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors"
              >
                <span className="text-3xl font-bold text-primary/30">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
