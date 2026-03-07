import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useSpeakers } from '../../hooks/useSpeakers';

export default function SpeakersListPage() {
  const { speakers, loading, error } = useSpeakers();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading speakers...</div>
      </div>
    );
  }

  if (error || speakers.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Error: {error || 'No speakers found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#EB0028] rounded-full blur-[200px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EB0028] rounded-full blur-[250px] opacity-10"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 backdrop-blur-sm" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.1em' }}>
              TEDXUOK 2025 SPEAKERS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white mb-6"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Our <span className="text-[#EB0028]">Speakers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            Meet the visionaries, innovators, and thought leaders who will share their groundbreaking ideas at TEDxUOK 2025
          </motion.p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search speakers..."
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:bg-white/10 focus:border-[#EB0028]/50 outline-none transition-all"
              style={{ fontWeight: 400, fontSize: '16px' }}
            />
          </div>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.speaker_id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Link to={`/speakers/${speaker.speaker_id}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-[#EB0028]/50 transition-all h-full"
                >
                  {/* Speaker Image */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={speaker.photo_url}
                      alt={speaker.full_name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.full_name)}&background=111&color=fff&size=512`;
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="flex items-center gap-2 px-6 py-3 bg-[#EB0028] text-white rounded-full shadow-lg">
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>View Profile</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Speaker Info */}
                  <div className="p-8 space-y-3">
                    <h3 className="text-white" style={{ fontWeight: 600, fontSize: '24px' }}>
                      {speaker.full_name}
                    </h3>
                    <p className="text-[#EB0028]" style={{ fontWeight: 500, fontSize: '14px' }}>
                      {speaker.title}
                    </p>
                    <p className="text-white/60 line-clamp-2" style={{ fontWeight: 300, fontSize: '15px', lineHeight: 1.6 }}>
                      {speaker.talk_title}
                    </p>
                    
                    {speaker.organization && (
                      <p className="text-white/40 text-sm">{speaker.organization}</p>
                    )}
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#EB0028]/0 to-[#EB0028]/0 group-hover:from-[#EB0028]/10 group-hover:to-transparent transition-all pointer-events-none"></div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-block relative bg-gradient-to-br from-[#EB0028]/10 to-transparent border border-[#EB0028]/20 rounded-3xl p-12">
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: '28px' }}>
              Don't Miss These Talks
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto" style={{ fontWeight: 300, fontSize: '16px', lineHeight: 1.7 }}>
              Get your tickets now to experience these inspiring speakers live at TEDxUOK 2025
            </p>
            <Link to="/#register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#EB0028] text-white rounded-full hover:bg-[#d00024] transition-all shadow-lg shadow-[#EB0028]/30"
                style={{ fontWeight: 500, fontSize: '16px' }}
              >
                Get Your Tickets
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
