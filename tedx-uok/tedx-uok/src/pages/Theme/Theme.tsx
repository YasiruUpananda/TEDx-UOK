import Loading from "../../components/ui/Loading";
import { supabase } from "../../api/supabaseClient";
import { useEvents } from "../../hooks/useEvents";
import { useSpeakers } from "../../hooks/useSpeakers";

const SPEAKER_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET_SPEAKER_PHOTOS;

const getImageUrl = (path: string | null, bucketName: string) => {
  if (!path)
    return "https://ui-avatars.com/api/?name=TEDx&background=EB0028&color=fff&size=400";
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
};

const subPillars = [
  {
    title: "Innovation",
    description:
      "Pushing boundaries and challenging conventional thinking to create meaningful change.",
  },
  {
    title: "Resilience",
    description:
      "Building strength through adversity and emerging stronger from challenges.",
  },
  {
    title: "Connection",
    description:
      "Bridging gaps between communities, disciplines, and perspectives.",
  },
];

const Theme = () => {
  const { event, loading: eventLoading } = useEvents();
  const { speakers, loading: speakersLoading } = useSpeakers();

  if (eventLoading || speakersLoading) {
    return <Loading />;
  }

  const realSpeakers = speakers.map((s) => ({
    id: s.speaker_id,
    name: s.full_name,
    topic: s.talk_title || "Topic To Be Announced",
    alignment: s.bio_short || s.title,
    image: getImageUrl(s.photo_url, SPEAKER_BUCKET),
  }));

  const themeName = event?.theme || "Breaking Boundaries";
  const themeParts = themeName.split(" ");
  const secondPart = themeParts.slice(1).join(" ");

  return (
    <main className="min-h-screen bg-background relative top-[-50px]">
      {/* Hero Section - Theme Title */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="container mx-auto">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4 opacity-0 animate-fade-in-up">
            TEDxUOK 2026 Theme
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 opacity-0 animate-fade-in-up animation-delay-100">
            <span className="text-foreground">Breaking</span>
            <br />
            <span className="text-primary">{secondPart || "Boundaries"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-up animation-delay-200">
            {event?.description ||
              "Exploring the edges of possibility and the courage to venture beyond."}
          </p>
        </div>
      </section>

      {/* Theme Story */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-medium text-primary tracking-widest uppercase mb-8">
            The Story
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Every significant advancement in human history began with someone
              questioning the limits of what was possible. From the first tools
              to the digital revolution, progress has always demanded that we
              push against the boundaries that define our world.
            </p>
            <p>
              "{themeName}" emerges from a simple observation: the most profound
              changes happen at the edges where disciplines intersect, where
              comfort zones end, and where the familiar gives way to the
              unknown.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 md:py-24 px-6 bg-card border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-medium text-primary tracking-widest uppercase mb-8">
            Why It Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                The Urgency of Now
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We stand at a pivotal moment. Climate change, technological
                disruption, and social transformation demand that we think
                differently. The boundaries we once accepted as fixed are
                revealing themselves as constructs.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                The Opportunity Ahead
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every boundary broken creates new possibilities. When we
                challenge conventional thinking, we don't just solve problems,
                we discover new questions worth asking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Relevance */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-medium text-primary tracking-widest uppercase mb-12">
            Relevance
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="border-l-2 border-primary pl-8">
              <h3 className="text-xl font-bold text-foreground mb-3">
                For Students
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The careers of tomorrow don't exist yet, they will be created by
                those who refuse to be confined by traditional categories.
              </p>
            </div>
            <div className="border-l-2 border-primary pl-8">
              <h3 className="text-xl font-bold text-foreground mb-3">
                For Our Community
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our community is a place of boundaries socioeconomic and
                cultural. Yet it is also a place that has always found ways to
                transcend them.
              </p>
            </div>
            <div className="border-l-2 border-primary pl-8">
              <h3 className="text-xl font-bold text-foreground mb-3">
                For the World
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Global challenges require global thinking. Understanding how to
                navigate and reshape these boundaries is the essential skill of
                our time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Pillars */}
      <section className="py-16 md:py-24 px-6 bg-card border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-medium text-primary tracking-widest uppercase mb-12">
            Sub-Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {subPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="p-6 border border-border rounded-xl bg-background"
              >
                <span className="text-4xl font-bold text-primary/20 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Speakers Align */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Speaker Alignment
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            See how our speakers interpret the theme "{themeName}".
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {realSpeakers.map((speaker) => (
              <div
                key={speaker.id}
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
                  <p className="text-sm text-primary mb-2">{speaker.topic}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {/* Using Bio as fallback for Alignment text */}
                    {speaker.alignment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Theme;
