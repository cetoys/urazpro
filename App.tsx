import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage'; // Consolidated product page
import ContentIdeationPage from './pages/ContentIdeationPage';
import LoyaltyPage from './pages/LoyaltyPage';
import AIChatbot from './components/AIChatbot';
import { useAppContext } from './contexts/AppContext';
import { UserTypeSelector } from './components/UserTypeSelector';

// New Page Imports
import AboutPage from './pages/AboutPage';
import ProsPage from './pages/ProsPage';
import BlogsPage from './pages/BlogsPage';
import NewsPage from './pages/NewsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import TestimonialsPage from './pages/TestimonialsPage';

const App: React.FC = () => {
  const { setIsChatbotOpen, setApiKeyStatus } = useAppContext();

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (apiKey && apiKey !== "YOUR_API_KEY_HERE" && apiKey.length > 10) {
        setApiKeyStatus('valid');
    } else {
        setApiKeyStatus('missing');
        console.warn("API_KEY is not configured. AI features will be disabled. Please set process.env.API_KEY.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-neutral-100 text-neutral-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-4">
            <UserTypeSelector />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} /> {/* Consolidated product page route */}
            <Route path="/content-ideation" element={<ContentIdeationPage />} />
            <Route path="/loyalty" element={<LoyaltyPage />} />
            {/* New Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pros" element={<ProsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
          </Routes>
        </main>
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50"
          aria-label="Open AI Chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.862 8.25-8.625 8.25S3.75 16.556 3.75 12s3.862-8.25 8.625-8.25S21 7.444 21 12z" />
          </svg>
        </button>
        <AIChatbot />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;