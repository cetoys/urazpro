import React from 'react';

const NewsPage: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "urazpro Announces New Eco-Friendly Product Line",
      date: "November 1, 2023",
      summary: "We are excited to introduce a new range of sustainable building materials, helping our customers build greener homes.",
      category: "Company News"
    },
    {
      id: 2,
      title: "Grand Opening of Our Expanded Garland Showroom",
      date: "October 20, 2023",
      summary: "Join us for the celebration! Our newly renovated showroom features more products and interactive displays.",
      category: "Events"
    },
    {
      id: 3,
      title: "Partnership with Local Builders to Support Community Projects",
      date: "September 15, 2023",
      summary: "urazpro is proud to collaborate with local construction firms on initiatives that give back to our community.",
      category: "Community"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-8">Latest News & Updates</h1>
      <div className="space-y-6">
        {newsItems.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
            <span className="text-xs bg-primary-light text-primary-dark font-semibold px-2 py-1 rounded-full mb-2 inline-block">{item.category}</span>
            <h2 className="text-2xl font-semibold text-primary mb-1">{item.title}</h2>
            <p className="text-sm text-neutral-500 mb-3">{item.date}</p>
            <p className="text-neutral-700">{item.summary}</p>
            <a href="#" className="text-accent hover:underline font-medium mt-3 inline-block">
              Read Full Story &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;