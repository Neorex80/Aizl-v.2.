import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 py-8">
            <div className="container mx-auto px-6 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400">
                        <h3 className="text-lg font-bold mb-2">Gemini App</h3>
                        <p className="text-sm mb-4">Empowering your digital journey with AI.</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Quick Links</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
                <p className="text-gray-400 mt-4">&copy; {new Date().getFullYear()} Gemini App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
