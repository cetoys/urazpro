
import React from 'react';
import { ContentIdea } from '../types';

interface ContentIdeaCardProps {
  idea: ContentIdea;
  index: number;
}

const ContentIdeaCard: React.FC<ContentIdeaCardProps> = ({ idea, index }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-primary mb-2">Idea {index + 1}: {idea.title}</h3>
      <p className="text-sm text-neutral-700 mb-3"><span className="font-medium">Synopsis:</span> {idea.synopsis}</p>
      <div className="text-sm text-neutral-600">
        <p className="font-medium mb-1">Key Talking Points:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {idea.talkingPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentIdeaCard;
