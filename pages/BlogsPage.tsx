import React from 'react';

const BlogsPage: React.FC = () => {
  // Mock blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Roofing Materials for Texas Homes",
      date: "October 26, 2023",
      excerpt: "Choosing the right roofing material in Texas means considering heat, hail, and hurricanes. We break down the top 5 options...",
      imageUrl: "https://placehold.co/600x400/FFAB76/343A40?text=Roofing+Blog"
    },
    {
      id: 2,
      title: "Kitchen Cabinet Trends: What's Hot in 2024",
      date: "October 15, 2023",
      excerpt: "Planning a kitchen remodel? Stay ahead of the curve with these stunning cabinet trends that blend style and functionality.",
      imageUrl: "https://placehold.co/600x400/A2D2FF/343A40?text=Cabinet+Trends"
    },
    {
      id: 3,
      title: "DIY Guide: Installing Laminate Flooring Like a Pro",
      date: "September 28, 2023",
      excerpt: "Laminate flooring is a great DIY project. Our step-by-step guide will help you achieve professional results.",
      imageUrl: "https://placehold.co/600x400/FFD6A5/343A40?text=DIY+Flooring"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-8">urazpro Blog</h1>
      <div className="space-y-10">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
            <img src={post.imageUrl} alt={post.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover"/>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-2">{post.title}</h2>
                <p className="text-sm text-neutral-500 mb-3">{post.date}</p>
                <p className="text-neutral-700 mb-4">{post.excerpt}</p>
              </div>
              <a href="#" className="text-accent hover:underline font-medium self-start">
                Read More &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default BlogsPage;