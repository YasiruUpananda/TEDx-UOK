import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ArrowLeft } from 'lucide-react';

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 animate-fade-in-up">

        {/* TEDx Logo */}
        <div className="mb-12 flex justify-center transform hover:scale-105 transition-transform duration-500">
          <div className="flex items-center">
            <span className="text-primary font-bold text-5xl md:text-7xl tracking-tighter">TED</span>
            <sup className="text-primary text-2xl md:text-3xl font-bold align-super top-[-0.5em] mx-1">x  </sup>
            <span className="text-foreground font-bold text-5xl md:text-7xl tracking-tighter">University of  Kelaniya</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          <span className="block text-foreground">Something Extraordinary</span>
          <span className="block text-primary mt-2">Is Coming Your Way</span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto font-light">
          We are working meticulously to bring you an immersive digital experience.
          Stay tuned for the unveiling of our new platform.
        </p>

        {/* Back to Home Button */}
        <div className="flex justify-center mb-16">
          <Link
            to="/"
            className="group inline-flex items-center px-10 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-[#cf001f] transition-all duration-300 shadow-[0_0_20px_rgba(235,0,40,0.3)] hover:shadow-[0_0_40px_rgba(235,0,40,0.5)] transform hover:-translate-y-1"
          >
            <ArrowLeft className="mr-3 h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            Return to Home
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-white/10 pt-10">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest font-semibold">Connect with us</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://facebook.com/TEDxUniversityofKelaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-card border border-border rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://instagram.com/TEDxUniversityofKelaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-card border border-border rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;