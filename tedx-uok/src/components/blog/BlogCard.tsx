import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types/models';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  // Extract excerpt from content (first <p> tag or first 150 chars)
  const getExcerpt = (htmlContent: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.slice(0, 150) + '...';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col h-full"
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl mb-6">
        <div className="aspect-[16/9] overflow-hidden bg-[#0E0E0E] border-b border-[#1F1F1F] relative">
           {post.cover_image_url ? (
            <img 
              src={post.cover_image_url} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-[#0E0E0E] text-white/20">
               TEDx UOK
             </div>
           )}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        </div>
      </Link>

      <div className="flex flex-col grow">
        <div className="flex items-center gap-4 text-xs font-medium text-[#EB0028] mb-3 uppercase tracking-wider">
          <span>{post.author_name}</span>
          <span className="text-white/20">•</span>
          <span>{formatDate(post.published_at)}</span>
        </div>

        <Link to={`/blog/${post.slug}`} className="group-hover:text-[#EB0028] transition-colors duration-300">
          <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h2>
        </Link>

        <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
          {getExcerpt(post.content)}
        </p>

        <div className="mt-auto">
          <Link 
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#EB0028] transition-colors"
          >
            Read Article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
