
import React, { useState } from 'react';
import { generateContentIdeas, isApiKeyConfigured } from '../services/geminiService';
import { ContentIdea } from '../types';
import ContentIdeaCard from '../components/ContentIdeaCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppContext } from '../contexts/AppContext';

const ContentIdeationPage: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKeyStatus } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    if (apiKeyStatus === 'missing') {
        setError('API Key is not configured. Cannot generate ideas.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setIdeas([]);

    try {
      const generatedIdeas = await generateContentIdeas(topic);
      setIdeas(generatedIdeas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-2">AI Content Ideation</h1>
      <p className="text-lg text-center text-neutral-600 mb-8">Generate creative content ideas for your marketing campaigns.</p>
      
      {apiKeyStatus === 'missing' && (
         <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <strong>API Key Missing:</strong> AI features are disabled. Please configure your Gemini API key.
          </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="topic" className="block text-lg font-medium text-neutral-700 mb-2">
            Content Topic:
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'Eco-friendly roofing solutions'"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition-colors"
            disabled={isLoading || apiKeyStatus === 'missing'}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || apiKeyStatus === 'missing'}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading && <LoadingSpinner size="sm" color="text-white" />}
          <span className={isLoading ? 'ml-2' : ''}>Generate Ideas</span>
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {ideas.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-6">Generated Ideas:</h2>
          <div className="space-y-6">
            {ideas.map((idea, index) => (
              <ContentIdeaCard key={index} idea={idea} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentIdeationPage;
