import React from 'react';
import Layout from '../components/layout/Layout'; 

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Have questions, feedback, or need assistance? We’re here to help! Fill out the form below or reach out through the contact details.
          </p>

          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              // Add your form submit logic here
              alert('Thank you for reaching out! We will get back to you soon.');
            }}
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-10 rounded shadow transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-16 border-t pt-10 text-center text-gray-700">
            <p className="mb-2">
              <strong>Phone:</strong> +254 700 000 000
            </p>
            <p className="mb-2">
              <strong>Email:</strong> support@matconnect.co.ke
            </p>
            <p>
              <strong>Address:</strong> Nairobi, Kenya
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
