import { motion } from 'framer-motion';
import { useBlog } from '../../hooks/useBlog';
import { BlogCard } from '../../components/blog/BlogCard';
import { FeaturedPost } from '../../components/blog/FeaturedPost';

export default function BlogListPage() {
  const { posts, loading } = useBlog();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#EB0028] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // First post is featured, rest are grid
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20">
      <div className="max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header - Minimal "r." style from inspiration, adapted to TEDx */}
        {/* Header - Minimal "r." style from inspiration, adapted to TEDx */}
        <div className="mb-16">
          <span className="font-bold text-2xl tracking-tighter">
            <span className="text-white">TEDx UOK</span>
            <span className="text-[#EB0028]">.</span>
          </span>
        </div>

        {/* Featured Hero Section */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* Featured Grid Section */}
        {gridPosts.length > 0 && (
          <div className="mt-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold mb-12 font-['Helvetica_Neue']"
            >
              Featured<span className="text-[#EB0028]">.</span>
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {gridPosts.map((post, index) => (
                <BlogCard key={post.blog_id} post={post} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
