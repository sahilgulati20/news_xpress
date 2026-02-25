import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { categories } from '../constants/data';

const Footer = () => {
    const { isDarkMode } = useTheme();

    return (
        <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300 mt-20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand/About */}
                    <div className="md:col-span-1">
                        <Link to="/" className="mb-6 inline-block">
                            <img
                                src={isDarkMode ? "/dark-logo.png" : "/light-logo.png"}
                                alt="The News Xpress"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            Delivering the most important stories from around the globe directly to your screen, 24/7. Trusted independent journalism.
                        </p>
                        <div className="flex space-x-4">
                            {/* Dummy Social Icons */}
                            {[...Array(4)].map((_, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
                                    <span className="sr-only">Social Link {i + 1}</span>
                                    <div className="w-4 h-4 rounded-sm bg-current"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Sections
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <a href={category.path} className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                                        {category.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {['About Us', 'Careers', 'Contact', 'Ethics Policy'].map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 3 */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3 text-sm flex flex-col">
                            {['Terms of Service', 'Privacy Policy', 'Cookie Settings', 'Accessibility'].map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} NewsPortal Inc. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 max-w-lg text-center md:text-right">
                        By accessing this site, you accept our Terms of Service and Privacy Policy. Do Not Sell My Personal Information.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
