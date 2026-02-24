const NewsCard = ({ article }) => {
    return (
        <article className="group cursor-pointer bg-white dark:bg-slate-900 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 px-3 py-1 rounded-sm text-xs font-black text-black uppercase tracking-wider">
                    {article.category}
                </div>
            </div>
            <div className="px-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                    {article.timestamp}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                </h3>
                {article.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {article.excerpt}
                    </p>
                )}
            </div>
        </article>
    );
};

export default NewsCard;
