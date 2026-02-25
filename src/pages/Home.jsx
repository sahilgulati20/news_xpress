import { useState, useEffect } from 'react';
import HeroArticle from '../components/HeroArticle';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import TrendingList from '../components/TrendingList';
import { getHeroPosts, getLatestPosts } from '../services/newsService';

const Home = () => {
    const [heroPosts, setHeroPosts] = useState([]);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [latestPosts, setLatestPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaginating, setIsPaginating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    // Fetch Hero only on mount
    useEffect(() => {
        const fetchHero = async () => {
            try {
                const heroes = await getHeroPosts();
                setHeroPosts(heroes);
            } catch (error) {
                console.error('Error fetching hero:', error);
            }
        };
        fetchHero();
    }, []);

    // Auto-advance hero slider
    useEffect(() => {
        if (heroPosts.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentHeroIndex(prev => (prev + 1) % heroPosts.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [heroPosts.length]);

    // Fetch Latest News on page change
    useEffect(() => {
        const fetchLatest = async () => {
            setIsPaginating(true);
            try {
                const { posts, totalCount: count } = await getLatestPosts(currentPage, pageSize);
                setLatestPosts(posts);
                setTotalCount(count);
            } catch (error) {
                console.error('Error fetching latest news:', error);
            } finally {
                setIsPaginating(false);
                setIsLoading(false);
            }
        };

        fetchLatest();

        // Scroll to news section when paginating (except initial load)
        if (currentPage > 1) {
            document.getElementById('latest-news').scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <div className="grow flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-0 sm:mt-8">
            {/* TOP STORIES SLIDER - Now separate from the main grid */}
            {heroPosts.length > 0 && currentPage === 1 && (
                <section className="mt-4 sm:mt-8 mb-12 border-b border-gray-200 dark:border-gray-800 pb-12 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-black text-red-600 dark:text-red-500 uppercase tracking-tight flex items-center">
                            <span className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                            Top Stories
                        </h1>
                        {heroPosts.length > 1 && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentHeroIndex(prev => (prev - 1 + heroPosts.length) % heroPosts.length)}
                                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Previous story"
                                >
                                    <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button
                                    onClick={() => setCurrentHeroIndex(prev => (prev + 1) % heroPosts.length)}
                                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Next story"
                                >
                                    <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative h-125 sm:h-150 w-full overflow-hidden rounded-2xl contain-content">
                        {heroPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-opacity ${index === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <HeroArticle
                                    article={post}
                                    priority={index === currentHeroIndex}
                                />
                            </div>
                        ))}

                        {heroPosts.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                                {heroPosts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentHeroIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentHeroIndex ? 'bg-emerald-400 w-10 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'bg-white/40 w-3 hover:bg-white/60'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <AdSpace type="billboard" className="mt-0 sm:mt-8 mb-8" />

            {/* MOBILE ONLY: Trending & Ad Sequence */}
            <div className="lg:hidden space-y-8 mb-12">
                <AdSpace type="standard" />
                <TrendingList isMobile={true} />
                <AdSpace type="standard" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Primary News Column */}
                <div className="w-full lg:w-2/3">
                    {/* Latest News Grid */}
                    <section id="latest-news" className="scroll-mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-gray-900 dark:border-white inline-block pb-2">
                                Latest News {currentPage > 1 && `(Page ${currentPage})`}
                            </h2>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 transition-opacity duration-300 ${isPaginating ? 'opacity-50' : 'opacity-100'}`}>
                            {latestPosts.map((post, index) => (
                                <div key={post.id} className="contents">
                                    <NewsCard article={post} />

                                    {/* Inject Ad after every 4th post to maintain grid balance (2-column layout) */}
                                    {(index + 1) % 4 === 0 && index !== latestPosts.length - 1 && (
                                        <div className="col-span-1 md:col-span-2">
                                            <AdSpace type="standard" className="my-4" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 mb-8 group">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1 || isPaginating}
                                        className="h-10 px-4 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-black text-xs uppercase tracking-widest flex items-center shadow-sm"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                        Prev
                                    </button>

                                    <div className="flex items-center -space-x-px overflow-x-auto no-scrollbar py-1">
                                        {(() => {
                                            const pages = [];
                                            const showMax = 5;
                                            let start = Math.max(1, currentPage - Math.floor(showMax / 2));
                                            let end = Math.min(totalPages, start + showMax - 1);

                                            if (end === totalPages) {
                                                start = Math.max(1, end - showMax + 1);
                                            }

                                            if (start > 1) {
                                                pages.push(
                                                    <button key={1} onClick={() => setCurrentPage(1)} className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 text-sm font-black transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 first:rounded-l-lg">1</button>
                                                );
                                                if (start > 2) pages.push(<span key="dots-start" className="px-2 text-gray-400 font-black">...</span>);
                                            }

                                            for (let i = start; i <= end; i++) {
                                                pages.push(
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentPage(i)}
                                                        className={`w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 text-sm font-black transition-all ${currentPage === i
                                                            ? 'bg-blue-600 border-blue-600 text-white z-10 scale-110 shadow-md rounded-md'
                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        {i}
                                                    </button>
                                                );
                                            }

                                            if (end < totalPages) {
                                                if (end < totalPages - 1) pages.push(<span key="dots-end" className="px-2 text-gray-400 font-black">...</span>);
                                                pages.push(
                                                    <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 text-sm font-black transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 last:rounded-r-lg">{totalPages}</button>
                                                );
                                            }
                                            return pages;
                                        })()}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages || isPaginating}
                                        className="h-10 px-4 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-black text-xs uppercase tracking-widest flex items-center shadow-sm"
                                    >
                                        Next
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                                <div className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-tighter">
                                    Displaying {currentPage} of {totalPages}
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Sidebar */}
                <Sidebar />
            </div>
        </main>
    );
};

export default Home;
