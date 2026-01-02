import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useSpeakers } from '../../hooks/useSpeakers';

export function Speakers() {
  const { speakers, loading } = useSpeakers();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  // Filter speakers based on search query
  const filteredSpeakers = useMemo(() => {
    return speakers.filter(speaker => {
      const query = searchQuery.toLowerCase();
      return (
        speaker.full_name.toLowerCase().includes(query) ||
        speaker.title.toLowerCase().includes(query) ||
        speaker.talk_title.toLowerCase().includes(query) ||
        (speaker.expertise || []).some(tag => tag.toLowerCase().includes(query))
      );
    });
  }, [speakers, searchQuery]);

  const displayedSpeakers = filteredSpeakers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSpeakers.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  if (loading) {
    return null;
  }

  return (
    <section id="speakers" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EB0028] rounded-full blur-[200px] opacity-10"></div>

      <div className="relative max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-[#EB0028]/10 border border-[#EB0028]/20 rounded-full text-[#EB0028] mb-6"
            style={{ fontWeight: 500, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Featured Speakers
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white mb-6"
            style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Meet Our <span className="text-[#EB0028]">Speakers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg mb-12"
            style={{ fontWeight: 300 }}
          >
            Visionaries, innovators, and thought leaders who are shaping the future
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search speakers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(4); // Reset visible count on search
              }}
              className="w-full pl-14 pr-6 py-4 bg-[#111] border border-white/10 rounded-full text-white placeholder-white/40 focus:bg-white/5 focus:border-[#EB0028]/50 outline-none transition-all"
              style={{ fontWeight: 400, fontSize: '16px' }}
            />
          </motion.div>
        </div>

        {/* Speaker Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatePresence mode='popLayout'>
            {displayedSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.speaker_id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
                    <div className="p-6 space-y-3">
                      <h3 className="text-white" style={{ fontWeight: 600, fontSize: '20px' }}>
                        {speaker.full_name}
                      </h3>
                      <p className="text-[#EB0028]" style={{ fontWeight: 500, fontSize: '13px' }}>
                        {speaker.title}
                      </p>
                      <p className="text-white/60 line-clamp-2" style={{ fontWeight: 300, fontSize: '14px', lineHeight: 1.6 }}>
                        {speaker.talk_title}
                      </p>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(speaker.expertise || []).slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-[10px]"
                            style={{ fontWeight: 400 }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#EB0028]/0 to-[#EB0028]/0 group-hover:from-[#EB0028]/10 group-hover:to-transparent transition-all pointer-events-none"></div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#EB0028] text-white rounded-full hover:bg-[#d00024] transition-all shadow-lg shadow-[#EB0028]/30"
              style={{ fontWeight: 500, fontSize: '16px' }}
            >
              Load More Speakers
            </motion.button>
          </div>
        )}

        {/* No Results Message */}
        {filteredSpeakers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40 text-lg">No speakers found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}