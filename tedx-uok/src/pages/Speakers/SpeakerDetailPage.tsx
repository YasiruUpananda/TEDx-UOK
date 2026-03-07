import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Twitter, Globe, Calendar, Clock, MapPin } from 'lucide-react';
import { useSpeaker } from '../../hooks/useSpeakers';

export function SpeakerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { speaker, loading, error } = useSpeaker(id!);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading speaker...</div>
      </div>
    );
  }

  if (error || !speaker) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl mb-4" style={{ fontWeight: 700 }}>Speaker Not Found</h1>
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-[#EB0028] text-white rounded-full hover:bg-[#d00024] transition-all"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-[#EB0028] rounded-full blur-[250px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EB0028] rounded-full blur-[200px] opacity-10"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <button 
            onClick={() => navigate(-1)}
            type="button"
          >
            <motion.div
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back
            </motion.div>
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Image */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="sticky top-32"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border border-white/10">
                <img
                  src={speaker.photo_url}
                  alt={speaker.full_name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.full_name)}&background=111&color=fff&size=512`;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex gap-4"
              >
                {speaker.social_links?.linkedin && (
                  <motion.a
                    href={speaker.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#EB0028] hover:border-[#EB0028] transition-all group"
                  >
                    <Linkedin size={20} className="text-white/60 group-hover:text-white transition-colors" />
                  </motion.a>
                )}
                {speaker.social_links?.twitter && (
                  <motion.a
                    href={speaker.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#EB0028] hover:border-[#EB0028] transition-all group"
                  >
                    <Twitter size={20} className="text-white/60 group-hover:text-white transition-colors" />
                  </motion.a>
                )}
                {speaker.social_links?.website && (
                  <motion.a
                    href={speaker.social_links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#EB0028] hover:border-[#EB0028] transition-all group"
                  >
                    <Globe size={20} className="text-white/60 group-hover:text-white transition-colors" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-3 space-y-12">
            {/* Speaker Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-white" style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {speaker.full_name}
              </h1>
              <p className="text-[#EB0028] text-2xl" style={{ fontWeight: 500 }}>
                {speaker.title}
              </p>
            </motion.div>

            {/* Organization */}
            {speaker.organization && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-5 py-2.5 bg-white/5 border border-white/10 rounded-full"
              >
                <span className="text-white/70" style={{ fontWeight: 500, fontSize: '14px' }}>
                  {speaker.organization}
                </span>
              </motion.div>
            )}

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-white" style={{ fontWeight: 600, fontSize: '28px' }}>
                About
              </h2>
              <p className="text-white/70 leading-relaxed text-lg" style={{ fontWeight: 300 }}>
                {speaker.bio_long}
              </p>
            </motion.div>

            {/* Talk Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative bg-gradient-to-br from-[#EB0028]/10 to-transparent border border-[#EB0028]/20 rounded-3xl p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#EB0028] rounded-full blur-[100px] opacity-10"></div>
              
              <div className="relative z-10 space-y-6">
                <h2 className="text-white" style={{ fontWeight: 600, fontSize: '28px' }}>
                  TEDx Talk
                </h2>
                <h3 className="text-[#EB0028] text-2xl" style={{ fontWeight: 600, lineHeight: 1.3 }}>
                  {speaker.talk_title}
                </h3>
                <p className="text-white/70 leading-relaxed text-lg" style={{ fontWeight: 300 }}>
                  {speaker.talk_description}
                </p>

                {/* Event Details */}
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#EB0028]" />
                    <div>
                      <p className="text-white/40 text-xs mb-1" style={{ fontWeight: 400 }}>Date</p>
                      <p className="text-white" style={{ fontWeight: 500, fontSize: '14px' }}>March 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#EB0028]" />
                    <div>
                      <p className="text-white/40 text-xs mb-1" style={{ fontWeight: 400 }}>Time</p>
                      <p className="text-white" style={{ fontWeight: 500, fontSize: '14px' }}>9 AM - 6 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#EB0028]" />
                    <div>
                      <p className="text-white/40 text-xs mb-1" style={{ fontWeight: 400 }}>Venue</p>
                      <p className="text-white" style={{ fontWeight: 500, fontSize: '14px' }}>UOK Campus</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/#register" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-10 py-5 bg-[#EB0028] text-white rounded-full hover:bg-[#d00024] transition-all shadow-lg shadow-[#EB0028]/30"
                  style={{ fontWeight: 500, fontSize: '16px' }}
                >
                  Get Your Tickets
                </motion.button>
              </Link>
              <Link to="/speakers" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-10 py-5 bg-white/5 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all"
                  style={{ fontWeight: 500, fontSize: '16px' }}
                >
                  View All Speakers
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakerDetailPage;