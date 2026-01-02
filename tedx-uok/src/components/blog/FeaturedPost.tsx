import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, User } from 'lucide-react';
import type { BlogPost } from '../../types/models';

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  // Extract snippet
  const getExcerpt = (htmlContent: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.slice(0, 200) + '...';
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readTime = calculateReadTime(post.content);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24"
    >
      {/* Visual Side */}
      <Link to={`/blog/${post.slug}`} className="block group overflow-hidden rounded-3xl relative aspect-[4/3] lg:aspect-auto lg:h-[600px] w-full">
        {post.cover_image_url ? (
          <img 
            src={post.cover_image_url} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-white/20 font-bold text-xl">TEDx UOK</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </Link>

      {/* Content Side */}
      <div className="flex flex-col justify-center space-y-6">
        <div className="flex items-center gap-4">
            <span className="text-[#EB0028] font-bold tracking-widest uppercase text-xs">
                FEATURED
            </span>
            <div className="h-px w-8 bg-white/20"></div>
        </div>

        <Link to={`/blog/${post.slug}`} className="group">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] group-hover:text-[#EB0028] transition-colors duration-300">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-white/60 text-lg leading-relaxed max-w-xl">
          {getExcerpt(post.content)}
        </p>

        <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#EB0028]" />
                </div>
                <span className="text-sm font-medium text-white">{post.author_name}</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
            </div>
        </div>

        <div className="pt-6">
            <Link 
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-white font-medium hover:text-[#EB0028] transition-colors"
            >
                Read Full Story 
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </motion.div>
  );
}
