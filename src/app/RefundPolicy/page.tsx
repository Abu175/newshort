import React from 'react';
import Footer from '@/app/UI/footer/page';
import Nav from "@/app/UI/Nav/page";

const RefundPolicy: React.FC = () => {
  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
        <p className="mb-4">
          Our refund policy is designed to ensure customer satisfaction. Here is how we handle refunds:
        </p>
        <h2 className="text-2xl font-semibold mb-2">1. Eligibility for Refunds</h2>
        <p className="mb-4">
          Refunds are available within 30 days of purchase if you are not satisfied with our service.
        </p>
        <h2 className="text-2xl font-semibold mb-2">2. How to Request a Refund</h2>
        <p className="mb-4">
          To request a refund, please contact us at support@thechatpdf.com with your purchase details.
        </p>
        <h2 className="text-2xl font-semibold mb-2">3. Processing Time</h2>
        <p className="mb-4">
          Refunds will be processed within 10 business days after receiving your request.
        </p>
        <h2 className="text-2xl font-semibold mb-2">4. Exceptions</h2>
        <p className="mb-4">
          Certain fees or charges may be non-refundable based on the service provided.
        </p>
        <p>
          If you have any questions about our refund policy, please contact us at webllix@gmail.com.
        </p>
      </div>
      <Footer />
    </div>

  );
};

export default RefundPolicy;
