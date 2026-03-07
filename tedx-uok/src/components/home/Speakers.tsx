import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

export interface Speaker {
  id: number;
  name: string;
  title: string;
  talkTitle: string;
  image: string;
}

interface Props {
  speakers: Speaker[];
}

const Speakers = ({ speakers }: Props) => {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Featured Speakers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Meet the minds behind
              <br />
              the ideas
            </h2>
          </div>
          <Link to="/speakers">
            <Button variant="tedxSecondary" size="lg">
              View All Speakers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <article
              key={speaker.name}
              className="group border border-border rounded-xl bg-card overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground">{speaker.name}</h3>
                <p className="text-sm text-primary mb-2">{speaker.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Talk Title :
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {speaker.talkTitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
