import { supabase } from '../lib/supabase';

const normalizePost = (post) => {
    if (!post) return null;
    return {
        ...post,
        imageUrl: post.cover_url || post.imageUrl,
        category: (post.tags && post.tags.length > 0) ? post.tags[0] : (post.category || 'General'),
        content: post.content_html || post.content,
        timestamp: post.published_at ? new Date(post.published_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : post.timestamp || 'Just now'
    };
};

export const getHeroPosts = async () => {
    const { data, error } = await supabase
        .from('hero_posts')
        .select(`
            id,
            posts (*)
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(item => normalizePost(item.posts)).filter(post => post !== null);
};

export const getTrendingPosts = async () => {
    const { data, error } = await supabase
        .from('trending_posts')
        .select(`
            id,
            posts (*)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) throw error;
    return data.map(item => normalizePost(item.posts));
};

export const getLatestPosts = async (page = 1, pageSize = 10) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(from, to);

    if (error) throw error;
    
    return {
        posts: data.map(normalizePost),
        totalCount: count
    };
};

const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

export const getCategoriesFromTags = async (limit = 15) => {
    const { data, error } = await supabase
        .from('posts')
        .select('tags')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (error) throw error;
    
    // Extract unique tags in order of appearance (latest posts first)
    const uniqueTags = [];
    data.forEach(post => {
        (post.tags || []).forEach(tag => {
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag);
            }
        });
    });
    
    // Limit the number of categories returned if specified
    const limitedTags = uniqueTags.slice(0, limit);
    
    return limitedTags.map(tag => ({
        id: tag.toLowerCase(),
        name: toTitleCase(tag),
        path: `/${tag.toLowerCase()}`
    }));
};

export const getPostsByCategory = async (categoryName, page = 1, pageSize = 10) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Supabase contains check is case-sensitive for array elements.
    // We'll try to match both the title case and lowercase version to be safe.
    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .or(`tags.cs.{${categoryName}},tags.cs.{${categoryName.toLowerCase()}},tags.cs.{${categoryName.toUpperCase()}}`)
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(from, to);

    if (error) throw error;
    return {
        posts: data.map(normalizePost),
        totalCount: count
    };
};

export const getPostBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return normalizePost(data);
};
