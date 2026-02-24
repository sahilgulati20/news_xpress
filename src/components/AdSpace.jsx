const AdSpace = ({ type = 'standard' }) => {
    // Define different dimensions based on ad type
    const styling = {
        billboard: 'w-full max-w-5xl h-[250px] mx-auto',   // Large top header ad
        standard: 'w-full h-[300px]',                    // Medium rectangle for grids
        sidebar: 'w-full h-[600px]',                     // Tall skyscraper
    };

    return (
        <div className={`relative flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 my-8 overflow-hidden overflow-hidden ${styling[type]}`}>
            <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Advertisement
            </span>
            <div className="text-gray-400 dark:text-gray-500 font-medium opacity-50 flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ad Space ({type})
            </div>
        </div>
    );
};

export default AdSpace;
