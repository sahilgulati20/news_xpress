import { useState, useEffect } from 'react';
import { getTeamMembers } from '../services/aboutService';
import { getGoogleDriveImageUrl, ensureAbsoluteUrl } from '../utils/urlHelper';

const About = () => {
    const [team, setTeam] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const data = await getTeamMembers();
                setTeam(data);
            } catch (error) {
                console.error('Error fetching team:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTeam();
    }, []);

    return (
        <div className="grow bg-white dark:bg-[#0b101e] transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 opacity-60">
                    <img 
                        src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=2000" 
                        alt="Newsroom" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black"></div>
                </div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 animate-fade-in-up">
                        Truth in <span className="text-blue-500">Motion.</span>
                    </h1>
                    <p className="text-xl text-gray-300 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
                        We are a global collective of journalists, creators, and truth-seekers dedicated to delivering the stories that matter, when they matter.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-blue-600 dark:text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8">
                            Empowering the world through <span className="italic">information.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                Founded in 2024, The News Xpress was built on a single premise: that journalism should be as fast as the world it covers, without ever sacrificing the depth and integrity that the truth requires.
                            </p>
                            <p>
                                In an era of misinformation, we serve as a beacon of clarity. Our team works around the clock to verify facts, contextualize complex global events, and provide a platform for voices that need to be heard.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <div className="h-64 rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1504711432866-b32014688ad7?auto=format&fit=crop&q=80&w=800" alt="Journalist" className="w-full h-full object-cover" />
                            </div>
                            <div className="h-48 bg-blue-600 rounded-2xl flex items-center justify-center p-8 text-white">
                                <p className="text-2xl font-black uppercase tracking-tighter leading-none text-center">24/7 Global Coverage</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-gray-200 dark:border-slate-700">
                                <p className="text-4xl font-black text-blue-600 mb-2">50+</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Countries Reached</p>
                            </div>
                            <div className="h-64 rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800" alt="Newsroom" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-gray-50 dark:bg-slate-900/50 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">Meet the Editorial Team</h2>
                        <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {team.map((member) => (
                                <div key={member.id} className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-700/50 hover:-translate-y-2">
                                    <div className="relative w-32 h-32 mx-auto mb-8">
                                        <div className="absolute inset-0 bg-blue-600 rounded-full scale-110 opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                                        <img 
                                            src={getGoogleDriveImageUrl(member.profile_url)} 
                                            alt={member.name} 
                                            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl group-hover:border-blue-500 transition-colors"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=200`;
                                            }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1">{member.name}</h3>
                                        <p className="text-sm font-bold text-blue-600 mb-4">{member.email}</p>
                                        
                                        {member.social_media && (
                                            <div className="flex justify-center gap-3">
                                                {(Array.isArray(member.social_media) ? member.social_media : JSON.parse(member.social_media || '[]')).map((social, sIdx) => (
                                                    <a 
                                                        key={sIdx} 
                                                        href={ensureAbsoluteUrl(social.url)} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 rounded-full hover:bg-blue-600 hover:text-white transition-all"
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
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
