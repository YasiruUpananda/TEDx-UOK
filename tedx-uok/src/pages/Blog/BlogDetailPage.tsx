import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { useBlog } from '../../hooks/useBlog';
import { BlogCard } from '../../components/blog/BlogCard';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading, getRelatedPosts } = useBlog();
  
  // Scroll to top on mount or slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#EB0028] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const post = posts.find(p => p.slug === slug);
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-[#EB0028] hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-[#EB0028] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
        >
          {post.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-6 text-sm text-white/60 border-y border-white/10 py-6"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#EB0028]" />
            <span className="text-white font-medium">{post.author_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#EB0028]" />
            <span>{formatDate(post.published_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#EB0028]" />
            <span>5 min read</span>
          </div>
        </motion.div>
      </div>

      {/* Cover Image */}
      {post.cover_image_url && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-6xl mx-auto px-6 lg:px-12 mb-16"
        >
          <div className="aspect-[21/9] overflow-hidden rounded-3xl bg-white/5">
            <img 
              src={post.cover_image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto px-6 lg:px-12 prose prose-invert prose-lg prose-headings:text-white prose-headings:font-bold prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-[#EB0028] prose-strong:text-white mb-24"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 lg:px-12 border-t border-white/10 pt-20">
          <h3 className="text-3xl font-bold mb-12">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <BlogCard key={relatedPost.blog_id} post={relatedPost} index={index} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
