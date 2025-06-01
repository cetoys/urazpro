import React from 'react';

const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Transforming a Historic Home with Modern Roofing Solutions",
      client: "The Peterson Residence",
      challenge: "Needed a roofing solution that respected historical aesthetics while providing modern durability and energy efficiency.",
      solution: "Utilized urazpro's premium architectural shingles and advanced underlayment systems.",
      outcome: "A beautifully restored roof that enhances curb appeal, improves energy efficiency by 15%, and offers a 50-year warranty.",
      imageUrl: "https://placehold.co/600x400/FF7D54/FFFFFF?text=Roofing+Case+Study"
    },
    {
      id: 2,
      title: "Complete Kitchen Overhaul for a Growing Family",
      client: "The Chen Family",
      challenge: "Required a larger, more functional kitchen with durable, stylish cabinetry and flooring to withstand heavy daily use.",
      solution: "Designed and supplied custom Shaker cabinets, quartz countertops, and luxury vinyl plank flooring from urazpro.",
      outcome: "A spacious, modern kitchen that meets the family's needs, with a 25% increase in storage and improved workflow.",
      imageUrl: "https://placehold.co/600x400/A2D2FF/343A40?text=Kitchen+Remodel"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-8">Project Case Studies</h1>
      <div className="space-y-10">
        {caseStudies.map(study => (
          <div key={study.id} className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img src={study.imageUrl} alt={study.title} className="w-full h-64 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-primary mb-1">{study.title}</h2>
              <p className="text-sm text-neutral-500 font-medium mb-3">Client: {study.client}</p>
              <div className="space-y-2 text-neutral-700">
                <p><strong>Challenge:</strong> {study.challenge}</p>
                <p><strong>Solution:</strong> {study.solution}</p>
                <p><strong>Outcome:</strong> {study.outcome}</p>
              </div>
               <a href="#" className="text-accent hover:underline font-medium mt-4 inline-block">
                View Full Project Details &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesPage;