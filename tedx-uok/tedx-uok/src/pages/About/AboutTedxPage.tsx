import { Link } from 'react-router-dom';
import { Check, ChevronLeft, ExternalLink, X } from 'lucide-react';

export default function AboutTedxPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
            <span className="text-foreground">TED</span>
            <span className="text-primary">x</span>
            <span className="text-foreground ml-2 sm:ml-4 text-2xl sm:text-4xl md:text-6xl lg:text-7xl block sm:inline mt-2 sm:mt-0">: Independently Organized</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto px-2">
            In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
          </p>
        </div>

        {/* Definition Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center md:text-left">What is TEDx?</h2>
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <p className="text-xl text-muted-foreground">
              TEDx events are independently organized under a free license granted by TED.
              These events bring the spirit of TED to local communities around the globe.
            </p>
          </div>
        </div>

        {/* TED vs TEDx */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center">TED vs TEDx</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* TED */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-3xl font-bold text-primary mb-6">TED</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">Organized directly by TED</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">Global conferences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">Speakers invited by TED</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">Paid attendance</span>
                </li>
              </ul>
            </div>

            {/* TEDx */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                <span className="text-foreground">TED</span>
                <span className="text-primary">x</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-foreground mr-2">•</span>
                  <span className="text-muted-foreground">Independently organized</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground mr-2">•</span>
                  <span className="text-muted-foreground">Local community events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground mr-2">•</span>
                  <span className="text-muted-foreground">Volunteer-organized</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground mr-2">•</span>
                  <span className="text-muted-foreground">Often free or low-cost</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Licensing */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center md:text-left">Licensing & Rules</h2>
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <p className="text-xl text-muted-foreground mb-6">
              TEDx events are operated under license from TED. Organizers agree to follow strict guidelines to ensure quality and consistency with TED values.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Key Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span className="text-muted-foreground">Non-commercial nature</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span className="text-muted-foreground">Official TEDx branding</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span className="text-muted-foreground">All talks recorded & shared</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Prohibited</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Political/religious agendas</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Pseudoscience content</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Individual talk sponsorship</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="https://www.ted.com/participate/organize-a-local-tedx-event"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors duration-300 mb-8 w-full sm:w-auto"
          >
            Learn About Organizing TEDx
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
          <div className="pt-8 border-t border-border">
            <Link
              to="/about"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to About Overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}