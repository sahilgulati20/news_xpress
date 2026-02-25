import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { getCategoriesFromTags } from '../services/newsService';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch up to 15 categories to demonstrate scrollability
                const tags = await getCategoriesFromTags(15);
                setCategories(tags);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Derived sections to mimic the rich, multi-column layout of Billboard
    const megaMenuColumns = [
        { title: 'NEWS', links: categories.slice(0, Math.ceil(categories.length / 3)) },
        { title: 'DISCOVER', links: categories.slice(Math.ceil(categories.length / 3), Math.ceil(categories.length / 3) * 2) },
        { title: 'LIFESTYLE', links: categories.slice(Math.ceil(categories.length / 3) * 2) },
        {
            title: 'COMPANY', links: [
                { id: 'c1', name: 'About Us', path: '#' },
                { id: 'c2', name: 'Careers', path: '#' },
                { id: 'c3', name: 'Contact', path: '#' }
            ]
        }
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-[#f8f9fa] dark:bg-[#0b101e] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Left Hand Side: Hamburger & Logo */}
                        <div className="flex items-center shrink-0">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="mr-6 p-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors"
                                aria-label="Toggle Menu"
                            >
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <Link to="/" className="shrink-0">
                                <img
                                    src={isDarkMode ? "/dark-logo.png" : "/light-logo.png"}
                                    alt="The News Xpress"
                                    className="h-10 sm:h-12 w-auto object-contain"
                                />
                            </Link>
                        </div>

                        {/* Center: Navigation Links (Scrollable with Shadows) */}
                        <div className="hidden lg:block flex-1 relative mx-4 overflow-hidden">
                            {/* Left Shadow Overlay */}
                            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-linear-to-r from-[#f8f9fa] dark:from-[#0b101e] to-transparent"></div>

                            <nav className="flex items-center px-8 overflow-x-auto no-scrollbar scroll-smooth">
                                <div className="flex space-x-10 items-center h-20 py-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={category.path}
                                            className="text-sm font-black text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all whitespace-nowrap uppercase tracking-widest relative group/link"
                                        >
                                            {category.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover/link:w-full"></span>
                                        </Link>
                                    ))}
                                </div>
                            </nav>

                            {/* Right Shadow Overlay */}
                            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-linear-to-l from-[#f8f9fa] dark:from-[#0b101e] to-transparent"></div>
                        </div>

                        {/* Right Hand Side: Utilities */}
                        <div className="flex items-center space-x-4 sm:space-x-6 ml-auto shrink-0">
                            <button aria-label="Search" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            <ThemeToggle />

                            <button className="hidden sm:block font-bold text-sm tracking-wider uppercase text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Billboard Mega Menu Overlay */}
                <div
                    className={`fixed inset-0 top-0 left-0 w-full h-screen bg-[#f4f4f4] dark:bg-[#0b101e] transform transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'} z-60 flex flex-col`}
                >
                    {/* Menu Utilities Header */}
                    <div className="w-full bg-[#f4f4f4] dark:bg-[#0b101e] border-b border-gray-300 dark:border-gray-800 h-20 flex justify-between items-center transition-colors duration-300 shrink-0 pr-0 pl-4 sm:pl-6 lg:pl-8 max-w-7xl mx-auto">

                        <div className="flex items-center space-x-6">
                            <Link to="/" className="shrink-0" onClick={() => setIsMenuOpen(false)}>
                                <img
                                    src={isDarkMode ? "/dark-logo.png" : "/light-logo.png"}
                                    alt="The News Xpress"
                                    className="h-10 sm:h-12 w-auto object-contain"
                                />
                            </Link>
                        </div>

                        {/* The Neon Square Close Button (Billboard reference) */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-20 h-20 bg-emerald-400 dark:bg-emerald-500 flex items-center justify-center hover:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors active:scale-95 group relative -mr-4 sm:-mr-6 lg:-mr-8"
                            aria-label="Close Menu"
                        >
                            <svg className="h-10 w-10 text-black group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Content - Scrollable multi-columns */}
                    <div className="grow overflow-y-auto w-full">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                                {megaMenuColumns.map((column, idx) => (
                                    <div key={idx}>
                                        {/* Column Header */}
                                        <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-widest mb-6 border-t-[3px] border-black dark:border-white pt-4 transition-colors">
                                            {column.title}
                                        </h3>

                                        {/* Links */}
                                        <ul className="space-y-3">
                                            {column.links.map((link) => (
                                                <li key={link.id}>
                                                    <Link
                                                        to={link.path}
                                                        className="text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white inline-block relative group transition-colors focus:outline-none"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {link.name}
                                                        {/* Animated underline on hover */}
                                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-400 dark:bg-emerald-400 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                            </div>

                            {/* Mobile only elements in Mega Menu */}
                            <div className="lg:hidden mt-8 pt-8 border-t border-gray-300 dark:border-gray-800">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-white dark:bg-slate-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 p-4 font-semibold focus:outline-none rounded-sm mb-6"
                                />
                                <div className="flex space-x-4">
                                    <ThemeToggle />
                                    <button className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 font-black uppercase tracking-wider transition-colors hover:bg-gray-800 dark:hover:bg-gray-200">
                                        Subscribe
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
