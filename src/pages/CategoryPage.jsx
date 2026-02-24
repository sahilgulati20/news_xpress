import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import { mainNews, trendingNews } from '../constants/data';

const CategoryPage = () => {
    const { category } = useParams();

    // Format category for display (e.g., "world" -> "World")
    const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'News';

    // In a real app, you would fetch data here based on the `category` param.
    // We'll simulate fetching relevant news by mixing our currently available mock data.
    const allMockData = [...mainNews, ...trendingNews].map((news, i) => ({
        ...news,
        id: `cat-${i}`,
        // Ensure all items fit the Newscard component structure
        excerpt: news.excerpt || 'Tap to read the full story and get the latest context.',
        imageUrl: news.imageUrl || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80`
    }));

    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
            {/* Category Header */}
            <div className="mb-10 text-center border-b border-gray-200 dark:border-gray-800 pb-8">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                    {displayCategory}
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative mt-8">
                {/* Category News Grid */}
                <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {allMockData.slice(0, 4).map((news) => (
                            <NewsCard key={news.id} article={{ ...news, category: displayCategory }} />
                        ))}

                        {/* Category Specific Ad */}
                        <div className="col-span-1 md:col-span-2">
                            <AdSpace type="standard" />
                        </div>

                        {allMockData.slice(4, 6).map((news) => (
                            <NewsCard key={news.id} article={{ ...news, category: displayCategory }} />
                        ))}
                    </div>
                </div>

                {/* Right Sidebar - Keeps trending consistent across the site */}
                <Sidebar />
            </div>
        </main>
    );
};

export default CategoryPage;
