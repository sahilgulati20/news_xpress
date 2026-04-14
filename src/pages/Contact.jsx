import { useState } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulating form submission
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="grow bg-white dark:bg-[#0b101e] transition-colors duration-300 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Get In Touch</span>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
                        We'd Love to <span className="text-blue-500 underline decoration-4 underline-offset-8">Hear From You.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
                        Have a news tip? Found a bug? Or just want to say hi? Our team is always ready to listen and respond.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center">
                                <span className="w-8 h-[2px] bg-blue-600 mr-3"></span>
                                Contact Details
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Editor In Chief</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">editor@newsxpress.com</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">General Inquiries</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">hello@newsxpress.com</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Global Headquarters</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
                                        Level 42, One World Center<br />
                                        New York, NY 10007, USA
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 p-8 rounded-3xl text-white">
                            <h3 className="text-lg font-black uppercase tracking-tight mb-4">News Tips?</h3>
                            <p className="text-blue-100 text-sm mb-6">
                                Think you have a story the world needs to know? Send us your tips securely.
                            </p>
                            <a href="mailto:tips@newsxpress.com" className="inline-block px-6 py-3 bg-white text-blue-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors">
                                Send a Tip
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Your Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-8">
                                <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Subject</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formState.subject}
                                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white"
                                    placeholder="Story Correction / Collaboration / General"
                                />
                            </div>

                            <div className="space-y-2 mb-10">
                                <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Message</label>
                                <textarea 
                                    rows="6"
                                    required
                                    value={formState.message}
                                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white resize-none"
                                    placeholder="Tell us what's on your mind..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-500/20"
                            >
                                Send Message
                            </button>

                            {isSubmitted && (
                                <div className="mt-6 p-4 bg-emerald-500 text-white text-center font-bold rounded-xl animate-fade-in">
                                    Message received! We'll get back to you shortly.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
