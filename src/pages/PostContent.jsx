import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { getPostBySlug, getPostsByCategory } from '../services/newsService';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import NewsCard from '../components/NewsCard';

const PostContent = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            try {
                const data = await getPostBySlug(slug);
                if (data) {
                    // Sanitize HTML content
                    data.content = sanitizeHtml(data.content_html || data.content || "", {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                            "iframe", "img", "div", "span", "figure", "figcaption"
                        ]),
                        allowedAttributes: {
                            ...sanitizeHtml.defaults.allowedAttributes,
                            "*": ["class", "style", "align", "id"],
                            iframe: ["src", "allow", "allowfullscreen", "frameborder", "scrolling", "class", "style"],
                            img: ["src", "alt", "title", "width", "height", "loading", "class", "style"],
                            div: ["class", "style", "align"]
                        },
                        allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"]
                    });
                    setPost(data);

                    if (data.category) {
                        const { posts: related } = await getPostsByCategory(data.category, 1, 3);
                        setRelatedPosts(related.filter(p => p.slug !== slug).slice(0, 2));
                    }
                }
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="grow flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="grow flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase">Post Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">The article you are looking for might have been removed or is temporarily unavailable.</p>
                <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 sm:mt-8">
            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Main Content Column */}
                <article className="w-full lg:w-2/3">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link to={`/${post.category?.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{post.category}</Link>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-10">
                        <div className="inline-block bg-blue-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] rounded-sm mb-4">
                            {post.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tighter">
                            {post.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 border-l-4 border-blue-600 pl-6 italic">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between py-6 border-y border-gray-100 dark:border-gray-800">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
                                    {post.author_avatar ? (
                                        <img src={post.author_avatar} alt={post.author} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-gray-400 uppercase">{post.author?.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight">
                                        By {post.author || 'News Staff'}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                                        {post.timestamp}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                {/* Share Buttons Placeholder */}
                                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <figure className="mb-12 rounded-3xl overflow-hidden shadow-2xl relative h-100 md:h-150">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        {post.image_caption && (
                            <figcaption className="absolute bottom-0 left-0 w-full p-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium italic">
                                {post.image_caption}
                            </figcaption>
                        )}
                    </figure>

                    {/* Article Content */}
                    <div
                        className="post-content max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                            <span className="text-xs font-black uppercase tracking-widest mr-2 py-1 text-gray-400">Tags:</span>
                            {post.tags.map(tag => (
                                <Link
                                    key={tag}
                                    to={`/${tag.toLowerCase()}`}
                                    className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-full text-xs font-bold transition-all"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Ad Space below content */}
                    <AdSpace type="standard" className="my-12" />

                    {/* Related Stories Section */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-10 flex items-center">
                                <span className="w-8 h-1 bg-blue-600 mr-4"></span>
                                Related Stories
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.map(related => (
                                    <NewsCard key={related.id} article={related} />
                                ))}
                            </div>
                        </section>
                    )}
                </article>

                {/* Sidebar */}
                <Sidebar />
            </div>
        </main>
    );
};

export default PostContent;
