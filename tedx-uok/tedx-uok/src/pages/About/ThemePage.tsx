import Section from "../../components/ui/Section";

const ThemePage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Replaced PageHero with this simple header */}
      <div className="px-6 mb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Theme: Horizons
        </h1>
        <p className="text-lg md:text-xl text-white/60">
          Exploring the limitless possibilities that lie ahead when we look
          beyond the immediate.
        </p>
      </div>

      <Section className="prose prose-invert max-w-4xl mx-auto px-6">
        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          The theme for TEDxUOK 2026 is <strong>"Horizons"</strong>.
        </p>
        <p className="text-gray-400 mb-6">
          Horizons represent the line where the earth meets the sky—a boundary
          that is both visible and unreachable, constantly moving as we advance.
          It symbolizes the future, the unknown, and the limit of our current
          understanding.
        </p>
        <p className="text-gray-400 mb-6">
          At this event, we invite speakers and attendees to look beyond their
          current horizons. Whether in technology, science, art, or society, we
          will explore ideas that push boundaries and expand our collective
          vision.
        </p>
      </Section>
    </div>
  );
};

export default ThemePage;
