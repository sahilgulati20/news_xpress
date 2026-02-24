import { trendingNews } from '../constants/data';

const Sidebar = () => {
    return (
        <aside className="w-full lg:w-1/3 lg:pl-8 mt-12 lg:mt-0">
            <div className="sticky top-24">
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
                <div className="space-y-6">
                    {trendingNews.map((news, index) => (
                        <article key={news.id} className="group cursor-pointer flex items-start space-x-4">
                            <div className="flex-shrink-0 text-3xl font-black text-gray-200 dark:text-gray-800 tabular-nums">
                                {(index + 1).toString().padStart(2, '0')}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                                    {news.category}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {news.title}
                                </h3>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    {news.timestamp}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Signup (Dummy) */}
                <div className="mt-12 bg-gray-100 dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Get the Daily Brief
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Start your morning with the most important stories, delivered straight to your inbox.
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold transition-colors">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
