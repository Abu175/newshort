import React from 'react';
import Footer from '@/app/UI/footer/page';
import Nav from "@/app/UI/Nav/page";

const TermsAndConditions: React.FC = () => {
  return (
    <div>
      <Nav/>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        Welcome to The webllix. By accessing or using our service, you agree to comply with and be bound by the following terms and conditions:
      </p>
      <h2 className="text-2xl font-semibold mb-2">1. Use of Service</h2>
      <p className="mb-4">
        You must not misuse our service. You will only use our service for lawful purposes and in accordance with our acceptable use policy.
      </p>
      <h2 className="text-2xl font-semibold mb-2">2. Account Responsibility</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>
      <h2 className="text-2xl font-semibold mb-2">3. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your access to our service immediately, without prior notice or liability, if you breach the terms.
      </p>
      <p>
        For more details, please contact us at webllix@gmail.com.
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default TermsAndConditions;
