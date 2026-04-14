import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getCategoriesFromTags } from '../services/newsService';
import { getTeamMembers } from '../services/aboutService';
import { getGoogleDriveImageUrl, ensureAbsoluteUrl } from '../utils/urlHelper';

const Footer = () => {
    const { isDarkMode } = useTheme();
    const [sections, setSections] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories
                const tags = await getCategoriesFromTags(12);
                setSections(tags);

                // Fetch Team
                const teamMembers = await getTeamMembers();
                setTeam(teamMembers);
            } catch (error) {
                console.error('Error fetching footer data:', error);
            }
        };
        fetchData();
    }, []);

    // Split sections into two columns for better footer layout
    const col1 = sections.slice(0, Math.ceil(sections.length / 2));
    const col2 = sections.slice(Math.ceil(sections.length / 2));

    return (
        <footer className="bg-gray-50 dark:bg-[#0b101e] border-t border-gray-200 dark:border-slate-800 transition-colors duration-300 mt-20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand/About & Team */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="mb-6 inline-block">
                            <img
                                src={isDarkMode ? "/dark-logo.png" : "/light-logo.png"}
                                alt="The News Xpress"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                            Delivering the most important stories from around the globe directly to your screen, 24/7. Trusted independent journalism for a modern world.
                        </p>

                        {/* Our Team Section */}
                        <div className="mt-8">
                            <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center">
                                <span className="w-8 h-px bg-blue-600 mr-3"></span>
                                Our Team
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {team.map((member) => (
                                    <div key={member.id} className="flex items-center group">
                                        <div className="relative w-10 h-10 shrink-0">
                                            <img
                                                src={getGoogleDriveImageUrl(member.profile_url)}
                                                alt={member.name}
                                                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm group-hover:border-blue-500 transition-colors"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'User')}&background=random`;
                                                }}
                                            />
                                        </div>
                                        <div className="ml-3 min-w-0">
                                            <p className="text-xs font-black text-gray-900 dark:text-white uppercase leading-none mb-1 truncate">
                                                {member.name}
                                            </p>

                                            {/* Conditional Email */}
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-[10px] text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors underline decoration-gray-300 dark:decoration-gray-700 underline-offset-2 block mb-1 truncate"
                                                >
                                                    {member.email}
                                                </a>
                                            )}

                                            {/* Dynamic Social Media Links */}
                                            {member.social_media && (
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {(Array.isArray(member.social_media) ? member.social_media : JSON.parse(member.social_media || '[]')).map((social, sIdx) => (
                                                        <a
                                                            key={sIdx}
                                                            href={ensureAbsoluteUrl(social.url)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[9px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 uppercase tracking-tighter border border-blue-100 dark:border-blue-900/30 px-1.5 py-0.5 rounded bg-blue-50/50 dark:bg-blue-900/20 transition-all hover:scale-105"
                                                        >
                                                            {social.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Sections - Column 1 */}
                    <div>
                        <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6 border-l-4 border-blue-600 pl-3">
                            News
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {col1.map((category) => (
                                <li key={category.id}>
                                    <Link to={category.path} className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors font-bold uppercase tracking-tight">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dynamic Sections - Column 2 */}
                    <div>
                        <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6 border-l-4 border-emerald-500 pl-3">
                            Discover
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {col2.map((category) => (
                                <li key={category.id}>
                                    <Link to={category.path} className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors font-bold uppercase tracking-tight">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6 border-l-4 border-gray-400 pl-3">
                            Company
                        </h3>
                        <ul className="space-y-3 text-sm font-bold uppercase tracking-tight">
                            {[
                                { name: 'About Us', path: '/about' },
                                // { name: 'Contact', path: '/contact' },
                                { name: 'Privacy Policy', path: '/privacy' },
                                { name: 'Ethics Policy', path: '/ethics' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Copyright Area */}
                <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} The News Xpress. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 max-w-lg text-center md:text-right">
                        By accessing this site, you accept our Terms of Service and Privacy Policy. Do Not Sell My Personal Information.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
