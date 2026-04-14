/**
 * Ensures a URL is absolute by adding https:// if no protocol exists.
 * Prevents relative path issues in browsers.
 * @param {string} url 
 * @returns {string}
 */
export const ensureAbsoluteUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
    }
    return trimmed;
};

/**
 * Helper to convert Google Drive sharing link to a direct image link
 * @param {string} url 
 * @returns {string}
 */
export const getGoogleDriveImageUrl = (url) => {
    if (!url) return '';
    const trimmedUrl = url.trim();
    
    // If it's already a direct link or not a Google Drive link, return it
    if (!trimmedUrl.includes('drive.google.com')) return trimmedUrl;

    // Extract ID from various Google Drive URL formats ( /d/ID/ or ?id=ID )
    const idMatch = trimmedUrl.match(/[-\w]{25,}/);
    if (idMatch) {
        const id = idMatch[0];
        // The 'thumbnail' endpoint is the official way Google serves embeddable images
        return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    }
    
    return trimmedUrl;
};

/**
 * Helper to extract YouTube video ID from various URL formats
 * @param {string} url 
 * @returns {string|null}
 */
export const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.trim().match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
};
