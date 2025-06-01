
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, UserType, GroundingChunk, GroundingMetadata } from '../types';
import { sendMessageToChatStream, startChat, resetChatOnUserTypeChange, isApiKeyConfigured } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import Modal from './Modal';
import { useAppContext } from '../contexts/AppContext';
import { GenerateContentResponse } from '@google/genai';


const AIChatbot: React.FC = () => {
  const { userType, isChatbotOpen, setIsChatbotOpen, apiKeyStatus } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize or reset chat when userType changes or component mounts
  useEffect(() => {
    if (apiKeyStatus === 'valid') {
        console.log("Chatbot: User type changed to", userType, "or component mounted. Resetting chat.");
        resetChatOnUserTypeChange(userType); 
        setMessages([{
            id: 'system-init',
            sender: 'system',
            text: `Hello! I'm urazproBot. How can I help you today as a ${userType === UserType.B2C ? 'retail customer' : 'contractor'}?`,
            timestamp: new Date(),
        }]);
    } else {
        setMessages([{
            id: 'system-error-apikey',
            sender: 'system',
            text: 'AI Chatbot is unavailable due to missing API key configuration.',
            timestamp: new Date(),
        }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, apiKeyStatus]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || apiKeyStatus === 'missing') return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    let currentAiMessageId = `ai-${Date.now()}`;
    let aiResponseText = '';
    let aiGroundingChunks: GroundingChunk[] = [];

    setMessages(prev => [...prev, { id: currentAiMessageId, sender: 'ai', text: '', timestamp: new Date() }]);

    try {
      const stream = await sendMessageToChatStream(input, userType);
      for await (const chunk of stream) {
        aiResponseText += chunk.text;
        // Extract grounding metadata
        const currentGrounding = (chunk.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined)?.groundingChunks;
        if (currentGrounding) {
            aiGroundingChunks = [...aiGroundingChunks, ...currentGrounding];
        }

        setMessages(prev => prev.map(msg => 
          msg.id === currentAiMessageId ? { ...msg, text: aiResponseText } : msg
        ));
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred with the AI chat.';
      setError(errorMsg);
      setMessages(prev => prev.map(msg => 
        msg.id === currentAiMessageId ? { ...msg, text: `Error: ${errorMsg}` } : msg
      ));
    } finally {
        // If grounding chunks exist, append them to the AI message
        if (aiGroundingChunks.length > 0) {
            let sourcesText = "\n\nSources:\n";
            const uniqueSources = Array.from(new Set(aiGroundingChunks.map(gc => gc.web.uri))) // Get unique URIs
                                    .map(uri => aiGroundingChunks.find(gc => gc.web.uri === uri)!); // Get first occurrence

            uniqueSources.forEach((gc, index) => {
                sourcesText += `${index + 1}. [${gc.web.title || gc.web.uri}](${gc.web.uri})\n`;
            });
            aiResponseText += sourcesText;
             setMessages(prev => prev.map(msg => 
                msg.id === currentAiMessageId ? { ...msg, text: aiResponseText } : msg
            ));
        }
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isLoading, userType, apiKeyStatus]);


  return (
    <Modal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} title="urazproBot AI Assistant" size="lg">
      <div className="flex flex-col h-[70vh]">
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-neutral-100 rounded-t-md">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow ${
                  msg.sender === 'user' ? 'bg-primary text-white' : 
                  msg.sender === 'ai' ? 'bg-white text-neutral-800' : 
                  'bg-neutral-200 text-neutral-600 text-sm italic text-center w-full'
                }`}
              >
                {msg.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line.match(/\[(.*?)\]\((.*?)\)/) ? (
                        <a href={line.replace(/.*?\((.*?)\).*/, '$1')} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {line.replace(/.*?\[(.*?)\].*/, '$1')}
                        </a>
                    ) : (
                        line
                    )}
                    <br/>
                  </React.Fragment>
                ))}
                <span className="block text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          {isLoading && messages[messages.length-1]?.sender !== 'ai' && ( /* Show spinner if last message isn't AI's placeholder */
             <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg shadow bg-white text-neutral-800">
                    <LoadingSpinner size="sm" />
                </div>
            </div>
          )}
        </div>
        {error && <div className="p-2 text-sm text-red-600 bg-red-100 border-t border-neutral-300">{error}</div>}
        <div className="p-4 border-t border-neutral-300 bg-white rounded-b-md">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={apiKeyStatus === 'missing' ? "AI Chat unavailable" : "Type your message..."}
              className="flex-grow px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-200"
              disabled={isLoading || apiKeyStatus === 'missing'}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || apiKeyStatus === 'missing'}
              className="bg-accent hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AIChatbot;