import Header from '@/components/custom/Header';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Home() {
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();

    const handleLinkClick = (type) => {
        if (type === 'about') {
            setPopup({
                title: "About AI Resume Maker",
                content: "AI Resume Maker simplifies resume-building with AI-generated content, ATS optimization, and stunning templates. Trusted by thousands of job seekers worldwide.",
            });
        } else if (type === 'privacy') {
            setPopup({
                title: "Privacy Policy",
                content: "We value your privacy. Your data is securely stored and never shared without your consent. Learn more about how we protect your information.",
            });
        } else if (type === 'contact') {
            setPopup({ type: 'contact' });
        }
    };

    const handleClosePopup = () => setPopup(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! We'll get back to you soon.");
        setPopup(null);
    };

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="text-center py-32 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <h1 className="text-6xl font-extrabold tracking-tight mb-6">
                    Create the Perfect Resume with AI
                </h1>
                <p className="text-xl mb-8 leading-relaxed">
                    Get hired faster with professionally designed, ATS-optimized resumes tailored to your dream job.
                </p>
                <button 
                    onClick={handleGetStarted}
                    className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <h2 className="text-4xl font-extrabold text-center mb-16">Why Choose Us?</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { emoji: "🚀", title: "AI-Powered Content", text: "Smart suggestions tailored to your skills and experience." },
                        { emoji: "📄", title: "ATS Optimization", text: "Ensure your resume passes through Applicant Tracking Systems." },
                        { emoji: "🎨", title: "Customizable Templates", text: "Choose from a variety of professionally designed templates." }
                    ].map((feature, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                            <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center text-3xl">
                                {feature.emoji}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-100">
                <h2 className="text-4xl font-extrabold text-center mb-16">What Our Users Say</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { text: "This AI resume maker helped me land my dream job! The templates are amazing, and the AI suggestions were spot on.", author: "Harsh Jha" },
                        { text: "I created a professional resume in minutes. The ATS optimization feature is a game-changer!", author: "Ansh Patel" }
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                            <p className="text-gray-700 italic mb-4">“{testimonial.text}”</p>
                            <p className="font-semibold text-blue-500">{testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="text-center py-32 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <h2 className="text-5xl font-extrabold mb-6">Ready to Build Your Resume?</h2>
                <button 
                    onClick={handleGetStarted}
                    className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Get Started
                </button>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="mb-4">
                        &copy; {new Date().getFullYear()} AI Resume Maker. All rights reserved.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" onClick={() => handleLinkClick('about')} className="hover:text-gray-400">About</a>
                        <a href="#" onClick={() => handleLinkClick('privacy')} className="hover:text-gray-400">Privacy Policy</a>
                        <a href="#" onClick={() => handleLinkClick('contact')} className="hover:text-gray-400">Contact</a>
                    </div>
                </div>
            </footer>

            {/* Pop-Up */}
            {popup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity animate-fade-in">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                        {popup.type === 'contact' ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <textarea
                                        placeholder="Your message"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleClosePopup}
                                            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-2">{popup.title}</h2>
                                <p className="text-gray-600">{popup.content}</p>
                                <button onClick={handleClosePopup} className="mt-4 text-blue-500 hover:underline">
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
