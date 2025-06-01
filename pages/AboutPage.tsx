import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-secondary-dark mb-6">About urazpro</h1>
      <div className="bg-white p-8 rounded-lg shadow-xl text-left">
        <p className="text-lg text-neutral-700 mb-4">
          Welcome to urazpro, your premier destination for high-quality home improvement products and solutions. 
          Founded on the principles of quality, reliability, and customer satisfaction, we strive to empower both homeowners and professional contractors.
        </p>
        <p className="text-lg text-neutral-700 mb-4">
          Our extensive catalog features top-tier materials for roofing, cabinetry, flooring, windows, and more. We partner with leading manufacturers to ensure every product meets our stringent standards for durability and aesthetics.
        </p>
        <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Our Mission</h2>
        <p className="text-lg text-neutral-700 mb-4">
          To provide exceptional products and expert guidance, helping our customers bring their vision for beautiful and functional spaces to life, whether it's a small DIY project or a large-scale construction.
        </p>
        <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-lg text-neutral-700 space-y-2 mb-4">
          <li>Wide selection of high-quality products.</li>
          <li>Competitive pricing for both B2C and B2B customers.</li>
          <li>Knowledgeable staff ready to assist you.</li>
          <li>Commitment to sustainable and eco-friendly options.</li>
          <li>Conveniently located showroom in Garland, TX.</li>
        </ul>
        <p className="text-lg text-neutral-700">
          Thank you for choosing urazpro. We look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;