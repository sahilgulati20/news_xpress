import TrendingList from './TrendingList';

const Sidebar = () => {
    return (
        <aside className="hidden lg:block w-full lg:w-1/3 lg:pl-8 mt-12 lg:mt-0">
            <div className="sticky top-24">
                <TrendingList />

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
