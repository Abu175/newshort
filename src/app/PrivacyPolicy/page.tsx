import React from 'react';
import Footer from '@/app/UI/footer/page';
import Nav from "@/app/UI/Nav/page";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information:
        </p>
        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect  information that you provide to us directly, such as your name and email address.
        </p>
        <h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
        <p className="mb-4">
          We use your information to provide and improve our services, and to communicate with you about your account or our service.
        </p>
        <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
        <p className="mb-4">
          We use reasonable measures to protect your information from unauthorized access or disclosure.
        </p>
        <h2 className="text-2xl font-semibold mb-2">4. Changes to Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. Any changes will be posted on this page.
        </p>
        <p>
          For any questions, please contact us at webllix@gmail.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
