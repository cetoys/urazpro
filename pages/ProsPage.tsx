import React from 'react';

const ProsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-secondary-dark mb-2">Professional Services</h1>
      <p className="text-xl text-neutral-600 mb-8">Tailored Solutions for Contractors, Builders, and HOA's</p>
      <div className="bg-white p-8 rounded-lg shadow-xl text-left space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-3">For Contractors & Builders</h2>
          <p className="text-lg text-neutral-700 mb-2">
            urazpro understands the unique needs of construction professionals. We offer a comprehensive range of services and products to ensure your projects are completed on time, within budget, and to the highest standards.
          </p>
          <ul className="list-disc list-inside text-lg text-neutral-700 space-y-1">
            <li>Volume-based and tiered pricing on materials.</li>
            <li>Dedicated account management and support.</li>
            <li>Efficient Request for Quote (RFQ) and order processing.</li>
            <li>Job site delivery options.</li>
            <li>Access to detailed product specifications and installation guides.</li>
            <li>Exclusive promotions and early access to new product lines.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-3">For Homeowners Associations (HOA's)</h2>
          <p className="text-lg text-neutral-700 mb-2">
            We partner with HOAs to provide durable, aesthetically consistent, and cost-effective solutions for community-wide improvement projects.
          </p>
          <ul className="list-disc list-inside text-lg text-neutral-700 space-y-1">
            <li>Bulk purchasing options for roofing, siding, windows, and more.</li>
            <li>Products that meet common HOA guidelines and architectural standards.</li>
            <li>Project coordination support.</li>
            <li>Long-term warranties and maintenance advice.</li>
            <li>Consultations to help select the best materials for your community's needs.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-3">Get Started with urazpro</h2>
          <p className="text-lg text-neutral-700">
            Contact our Pro Desk today to discuss your specific requirements, set up a professional account, or request a quote for your next project. We are committed to being your trusted partner in success.
          </p>
          <div className="mt-6 text-center">
            <button className="bg-accent hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors">
              Contact Our Pro Desk
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProsPage;