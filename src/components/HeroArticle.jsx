const HeroArticle = ({ article }) => {
    return (
        <article className="relative w-full h-[60vh] min-h-[500px] mb-8 group cursor-pointer overflow-hidden rounded-xl">
            {/* Background Image */}
            <img
                src={article.imageUrl}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4 lg:w-2/3">
                <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-emerald-500 text-black text-xs font-black px-3 py-1 uppercase tracking-wider rounded-sm">
                        {article.category}
                    </span>
                    <span className="text-gray-300 text-sm font-medium">
                        {article.timestamp}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                    {article.title}
                </h1>

                <p className="text-gray-200 text-lg line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl">
                    {article.excerpt}
                </p>

                {article.author && (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
                        <span className="text-white font-medium">By {article.author}</span>
                    </div>
                )}
            </div>
        </article>
    );
};

export default HeroArticle;
