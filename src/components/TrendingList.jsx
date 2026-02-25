import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingPosts } from '../services/newsService';

const TrendingList = ({ isMobile = false }) => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await getTrendingPosts();
                setTrendingPosts(data);
            } catch (error) {
                console.error('Error fetching trending posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrending();
    }, []);

    return (
        <div className={isMobile ? "w-full" : ""}>
            {/* Trending Section Header */}
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-900 dark:border-white pb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    Trending Now
                </h2>
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>

            {/* Trending List */}
            <div className={`space-y-8 ${isMobile ? 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 space-y-0' : ''}`}>
                {isLoading ? (
                    <div className="flex justify-center py-8 col-span-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    trendingPosts.map((news, index) => (
                        <Link key={news.id} to={`/post/${news.slug}`} className="block">
                            <article className="group cursor-pointer flex gap-4 items-start">
                                {/* Ranking Number */}
                                <div className="shrink-0 text-3xl font-black text-gray-200 dark:text-gray-800 tabular-nums pt-1">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex gap-4">
                                        {/* Small Thumbnail */}
                                        <div className="shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800">
                                            <img
                                                src={news.imageUrl}
                                                alt={news.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
                                                {news.category}
                                            </div>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                                                {news.title}
                                            </h3>
                                            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                                                {news.timestamp}
                                            </div>
                                        </div>
                                    </div>

                                    {news.excerpt && (
                                        <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {news.excerpt}
                                        </p>
                                    )}
                                </div>
                            </article>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrendingList;
