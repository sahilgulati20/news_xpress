const Privacy = () => {
    return (
        <div className="grow bg-gray-50 dark:bg-[#0b101e] py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
                <div className="bg-blue-600 p-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Privacy Policy</h1>
                    <p className="text-blue-100 uppercase tracking-widest text-xs font-bold">Effective Date: April 14, 2026</p>
                </div>
                
                <div className="p-8 md:p-16 prose prose-lg dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-blue-600 inline-block pb-1 mb-6">1. Introduction</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            At The News Xpress, we take your privacy seriously. This policy describes how we collect, use, and handle your data when you use our website, mobile apps, and other services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-blue-600 inline-block pb-1 mb-6">2. Data We Collect</h2>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-3">
                            <li><strong>Account Information:</strong> If you register, we collect your name and email address.</li>
                            <li><strong>Usage Data:</strong> We track how you interact with our news articles to improve our content.</li>
                            <li><strong>Device Info:</strong> We collect basic information about your browser and device type to optimize display.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-blue-600 inline-block pb-1 mb-6">3. Cookies</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            We use cookies to personalize your experience and analyze our traffic. You can control cookie settings through your browser at any time.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight border-b-2 border-blue-600 inline-block pb-1 mb-6">4. Your Rights</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Under the GDPR and CCPA, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact our privacy officer at <strong>privacy@newsxpress.com</strong>.
                        </p>
                    </section>

                    <div className="mt-16 pt-8 border-t border-gray-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-gray-500 italic">This policy is subject to change. We will notify users of any significant updates via email or site banner.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
