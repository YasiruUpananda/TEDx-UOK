import { useState, useEffect } from 'react';
import type { BlogPost } from '../types/models';
import { supabase } from '../lib/supabaseClient';

export function useBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('is_published', true)
                    .order('published_at', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data) {
                    setPosts(data as BlogPost[]);
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const getPostBySlug = async (slug: string) => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            return data as BlogPost;
        } catch (err) {
            console.error(`Error fetching post ${slug}:`, err);
            return undefined;
        }
    };

    const getRelatedPosts = (currentSlug: string) => {
        return posts.filter(p => p.slug !== currentSlug).slice(0, 2);
    };

    return { posts, loading, error, getPostBySlug, getRelatedPosts };
}
