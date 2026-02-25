import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import { getPostsByCategory } from '../services/newsService';

const CategoryPage = () => {
    const { category } = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaginating, setIsPaginating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    // Local formatter for title case
    const toTitleCase = (str) => {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    };

    const displayCategory = toTitleCase(category);

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            if (currentPage === 1) setIsLoading(true);
            else setIsPaginating(true);

            try {
                // Pass the raw category (slug) to the service for accurate tag matching
                const { posts: data, totalCount: count } = await getPostsByCategory(category, currentPage, pageSize);
                setPosts(data);
                setTotalCount(count);
            } catch (error) {
                console.error('Error fetching category news:', error);
            } finally {
                setIsLoading(false);
                setIsPaginating(false);
            }
        };

        fetchCategoryPosts();

        // Scroll to top when paginating
        if (currentPage > 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [category, displayCategory, currentPage]);

    // Reset page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <div className="grow flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
            {/* Category Header */}
            <div className="mb-10 text-center border-b border-gray-200 dark:border-gray-800 pb-8">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                    {displayCategory}
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative mt-8">
                {/* Category News Grid */}
                <div className="w-full lg:w-2/3">
                    {posts.length > 0 ? (
                        <>
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 transition-opacity duration-300 ${isPaginating ? 'opacity-50' : 'opacity-100'}`}>
                                {posts.map((news, index) => (
                                    <div key={news.id} className="contents">
                                        <NewsCard article={news} />

                                        {/* Inject Ad after every 4th post to maintain grid balance */}
                                        {(index + 1) % 4 === 0 && index !== posts.length - 1 && (
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
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No news found in this category.</h3>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Keeps trending consistent across the site */}
                <Sidebar />
            </div>
        </main>
    );
};

export default CategoryPage;
