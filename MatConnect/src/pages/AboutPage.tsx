import React from 'react';
import Layout from '../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>      
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              At MatConnect, we are dedicated to connecting travelers across Kenya with safe, reliable, and affordable transportation. Our mission is to simplify your journey, every step of the way.
            </p>
          </div>

          {/* Mission */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              We strive to provide seamless booking experiences, real-time schedules, and exceptional customer support. Whether commuting daily or planning a trip, MatConnect is your trusted travel companion.
            </p>
          </div>

          {/* Values / Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
            <div className="bg-gray-50 rounded-lg p-8 shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Reliability</h3>
              <p className="text-gray-600">
                We partner with trusted operators to ensure every ride is safe and punctual.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Affordability</h3>
              <p className="text-gray-600">
                Competitive pricing without compromising on quality or comfort.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Customer Support</h3>
              <p className="text-gray-600">
                Our friendly team is always ready to assist you, anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {/* Sample team member */}
              <div className="text-center">
                <img
                  src="/team/jane.jpg"
                  alt="Jane Doe"
                  className="mx-auto mb-4 w-32 h-32 rounded-full object-cover shadow-md"
                />
                <h3 className="text-xl font-medium text-gray-900">Jane Doe</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="text-center">
                <img
                  src="/team/john.jpg"
                  alt="John Smith"
                  className="mx-auto mb-4 w-32 h-32 rounded-full object-cover shadow-md"
                />
                <h3 className="text-xl font-medium text-gray-900">John Smith</h3>
                <p className="text-gray-600">CTO</p>
              </div>
              {/* Add more team members or make dynamic if needed */}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <a
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded shadow transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
