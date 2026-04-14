import { useState, useEffect } from 'react';
import { getActiveAds } from '../services/adService';
import { getYouTubeID, getGoogleDriveImageUrl, ensureAbsoluteUrl } from '../utils/urlHelper';

const AdSpace = ({ type = 'standard', className = 'my-8' }) => {
    const [ad, setAd] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const styling = {
        billboard: 'w-full max-w-5xl min-h-[250px] sm:h-[300px] mx-auto',
        standard: 'w-full h-[300px]',
        sidebar: 'w-full h-[600px]',
    };

    // HOOKS MUST BE AT THE TOP
    useEffect(() => {
        let isMounted = true;
        const loadAds = async () => {
            try {
                const ads = await getActiveAds();
                if (isMounted && ads && ads.length > 0) {
                    const selected = ads[Math.floor(Math.random() * ads.length)];
                    setAd(selected);
                }
            } catch (error) {
                console.error('Failed to load ad:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadAds();
        return () => { isMounted = false; };
    }, []);

    const adType = ad?.type?.toLowerCase() || '';
    const adUrl = ad?.url?.toLowerCase() || '';

    // More lenient detection
    const isImage = adType.includes('image') || adUrl.includes('drive.google.com') || adUrl.match(/\.(jpg|jpeg|png|webp|gif)$/);
    const isYoutube = adType.includes('video') || adUrl.includes('youtube.com') || adUrl.includes('youtu.be');

    useEffect(() => {
        if (ad && !isYoutube && !isImage && !isLoading) {
            console.warn('Ad found with unrecognized type:', ad.type);
        }
        if (ad && isImage) {
            console.log('Ad Image URL:', getGoogleDriveImageUrl(ad.url?.trim()));
        }
    }, [ad, isYoutube, isImage, isLoading]);



    const [isPlaying, setIsPlaying] = useState(false);

    const handleAdClick = () => {
        // Only trigger play if it's a video and not already playing
        if (!isImage && !isPlaying) {
            setIsPlaying(true);
        }
    };

    const handleOpenClick = (e) => {
        e.stopPropagation();
        if (ad?.redirect_url) {
            window.open(ensureAbsoluteUrl(ad.redirect_url), '_blank', 'noopener,noreferrer');
        }
    };

    if (isLoading) {
        return (
            <div className={`relative flex items-center justify-center bg-gray-100 dark:bg-slate-800 animate-pulse rounded-xl overflow-hidden ${className} ${styling[type]}`}>
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!ad) {
        return (
            <div className={`relative flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-700 rounded-xl overflow-hidden grayscale opacity-50 ${className} ${styling[type]}`}>
                <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Advertisement
                </span>
                <div className="text-gray-400 dark:text-gray-500 font-medium flex flex-col items-center">
                    <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Ad Space
                </div>
            </div>
        );
    }

    const youtubeId = getYouTubeID(ad.url);
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    // Wrapper for images
    const MediaWrapper = ({ children }) => {
        if (isImage && ad.redirect_url) {
            return (
                <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    {children}
                </a>
            );
        }
        return <div className="w-full h-full">{children}</div>;
    };

    return (
        <div
            className={`relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 ${className} ${styling[type]}`}
            onClick={handleAdClick}
        >
            <span className="absolute top-2 right-2 z-30 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] bg-black/50 text-white backdrop-blur-md rounded-full pointer-events-none">
                Sponsored
            </span>

            {/* "Open" Button for Video Redirects */}
            {!isImage && ad.redirect_url && (
                <button
                    onClick={handleOpenClick}
                    className="absolute bottom-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2"
                >
                    Open
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            )}

            <div className="w-full h-full flex flex-col min-h-0">
                <div className="relative flex-1 grow overflow-hidden bg-black min-h-50">
                    <MediaWrapper>
                        {isImage ? (
                            <img
                                src={getGoogleDriveImageUrl(ad.url?.trim())}
                                alt={ad.title || "Ad Image"}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://pv-magazine-usa.com/wp-content/uploads/sites/2/2019/10/placeholder.png';
                                }}
                            />

                        ) : isPlaying ? (
                            <iframe
                                className="w-full h-full absolute inset-0"
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&modestbranding=1`}
                                title={ad.title || "Ad Video"}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full relative cursor-pointer">
                                <img
                                    src={thumbnailUrl}
                                    alt="Video Thumbnail"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </MediaWrapper>

                    {(ad.title || ad.description) && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    )}
                </div>

                {/* Text content - Only show if present */}
                {(ad.title || ad.description) && (
                    <div className="p-4 bg-white dark:bg-slate-900 z-20">
                        {ad.title && (
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {ad.title}
                            </h3>
                        )}
                        {ad.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                {ad.description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdSpace;
