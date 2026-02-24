import HeroArticle from '../components/HeroArticle';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import { topStory, mainNews } from '../constants/data';

const Home = () => {
    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
            {/* Top Billboard Ad Space */}
            <AdSpace type="billboard" />

            <div className="flex flex-col lg:flex-row gap-12 relative mt-8">
                {/* Primary News Column */}
                <div className="w-full lg:w-2/3">
                    {/* Top Story Spotlight */}
                    <section className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-red-600 dark:text-red-500 uppercase tracking-tight flex items-center">
                                <span className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                                Top Story
                            </h2>
                        </div>
                        <HeroArticle article={topStory} />
                    </section>

                    {/* Latest News Grid with In-Feed Ad */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-gray-900 dark:border-white inline-block pb-2">
                                Latest News
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            <NewsCard article={mainNews[0]} />
                            <NewsCard article={mainNews[1]} />

                            {/* In-Feed Advertisement */}
                            <div className="col-span-1 md:col-span-2">
                                <AdSpace type="standard" />
                            </div>

                            <NewsCard article={mainNews[2]} />
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <Sidebar />
            </div>
        </main>
    );
};

export default Home;
