const Ethics = () => {
    return (
        <div className="grow bg-gray-50 dark:bg-[#0b101e] py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
                <div className="bg-emerald-600 p-12 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Editorial Ethics & Integrity</h1>
                    <p className="uppercase tracking-[0.3em] text-xs font-bold opacity-80 underline underline-offset-4">Our Commitment to the Truth</p>
                </div>
                
                <div className="p-8 md:p-16 prose prose-lg dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-emerald-600 inline-block pb-1 mb-6">1. Accuracy & Verification</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Our primary obligation is to the truth. No story is published until a minimum of two independent sources have verified the facts. We prioritize accuracy over speed in every circumstance.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-emerald-600 inline-block pb-1 mb-6">2. Independence</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            The News Xpress remains fiercely independent. Our editorial coverage is never influenced by advertisers, corporate partners, or political affiliations.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-emerald-600 inline-block pb-1 mb-6">3. Transparency & Corrections</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            If we make a mistake, we own it. Corrections are made promptly and clearly at the top of the article. We are transparent about our reporting process and our sources (where safety permits).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-emerald-600 inline-block pb-1 mb-6">4. Harm Minimization</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            We treat sources, subjects, and colleagues as human beings deserving of respect. We show special sensitivity when dealing with children, victims of crimes, and vulnerable populations.
                        </p>
                    </section>

                    <div className="mt-16 pt-12 border-t border-gray-100 dark:border-slate-800 flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                            <span className="text-emerald-600 text-2xl">✓</span>
                        </div>
                        <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest text-center">Certified Journalism Excellence</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ethics;
