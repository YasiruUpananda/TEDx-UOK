import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Handshake, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';



const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function AboutPage() {
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase
          .from('events')
          .select('theme, description')
          .eq('event_id', '1268c78b-d746-42ee-8021-1cd276ce0ff8')
          .single();

        if (data) {
          setTheme(data.theme || 'Breaking Boundaries');
          setDescription(data.description || 'Exploring the edges of possibility...');
        }
      } catch (error) {
        console.error('Error:', error);
        setTheme('Breaking Boundaries');
        setDescription('Exploring the edges of possibility and the courage to venture beyond');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* FIXED: TED<sup>x</sup>UOK with superscript x */}
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="text-foreground">About</span>
            <span className="text-primary ml-4">
              TED<sup className="text-[0.8em] align-super">x</sup>UoK
            </span>
          </h1>
          
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {loading ? (
                <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
              ) : (
                theme
              )}
            </h2>
            
            {loading ? (
              <div className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                <div className="h-6 w-full max-w-2xl bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ) : (
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Cards - FIXED: All with superscript x */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* TED Card */}
          <Link
            to="/about/ted"
            className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300"
          >
            <div className="mb-6">
              <span className="text-primary font-bold text-4xl sm:text-5xl">TED</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              About TED
            </h2>
            <p className="text-muted-foreground mb-6">
              Mission, history, and global initiatives of the world's leading
              ideas platform.
            </p>
            <div className="flex items-center text-foreground font-medium group-hover:text-primary transition-colors">
              Learn more
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </Link>

          {/* TEDx Card - FIXED: TED<sup>x</sup> */}
          <Link
            to="/about/tedx"
            className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300"
          >
            <div className="mb-6">
              <span className="text-primary font-bold text-5xl">
                TED<sup className="text-[0.6em] align-super">x</sup>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              About TED<sup className="text-[0.7em] align-super">x</sup>
            </h2>
            <p className="text-muted-foreground mb-6">
              Learn about the TED<sup className="text-[0.6em] align-super">x</sup> program, licensing, and how it differs from TED conferences.
            </p>
            <div className="flex items-center text-foreground font-medium group-hover:text-primary transition-colors">
              Learn more
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </Link>

          {/* TEDxUOK Card - FIXED: TED<sup>x</sup>UOK */}
          <Link
            to="/about/tedx-uok"
            className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300"
          >
            <div className="mb-6 flex items-start">
              <span className="text-primary font-bold text-5xl">
                TED<sup className="text-[0.6em] align-super">x</sup>
              </span>
              <span className="text-foreground font-bold text-5xl ml-2">UoK</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              About TED<sup className="text-[0.7em] align-super">x</sup>UoK
            </h2>
            <p className="text-muted-foreground mb-6">
              Our story, mission, and commitment to spreading ideas at
              University of Kelaniya.
            </p>
            <div className="flex items-center text-foreground font-medium group-hover:text-primary transition-colors">
              Learn more
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </Link>
        </div>

        {/* Why Ideas Matter Section */}
        <div className="bg-card border border-border rounded-lg p-10 mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Why Ideas Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Innovation
              </h3>
              <p className="text-muted-foreground">
                Ideas drive progress and innovation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Global Impact
              </h3>
              <p className="text-muted-foreground">
                Local ideas with worldwide influence
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Community
              </h3>
              <p className="text-muted-foreground">
                Building connections through shared ideas
              </p>
            </div>
          </div>
        </div>

        {/* Current Event Info */}
        {!loading && theme && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  TED<sup className="text-[0.6em] align-super">x</sup>UoK 2026 Theme
                </h3>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-primary">{theme}</span>
                </p>
              </div>
              <Link
                to="/events"
                className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors"
              >
                View Event Details
              </Link>
            </div>
          </div>
        )}

        {/* CTA Buttons - FIXED: Also with superscript */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/"
              className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
            >
              Return Home
            </Link>
            <Link
              to="/events"
              className="px-8 py-3 bg-[#EB0028] text-white rounded-full font-bold hover:bg-red-700 transition-colors duration-300"
            >
              View TED<sup className="text-[0.6em] align-super">x</sup> Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
