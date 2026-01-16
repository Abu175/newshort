'use client';
'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, DollarSign, XCircle } from 'lucide-react';

const PricingUI = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const togglePricing = () => {
    setIsYearly((prevState) => !prevState);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch('/api/users/me');
        const data = await res.json();
        setUserId(data.data._id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }, []);

  const handleBuy = async (priceId: string) => {
    if (!userId) {
      toast.error('Please log in to make a purchase');
      return;
    }

    if (!priceId) {
      toast.error('Invalid product selection');
      return;
    }

    try {
      const response = await fetch('/api/users/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      toast.error('Failed to initiate purchase. Please try again.');
    }
  };

  const plans = [
    {
      title: 'Starter',
      price: isYearly ? '39/mo' : '44/mo',
      description: 'Ideal for beginners or individuals building their first project.',
      features: [
        '5 Landing pages',
        '50 Logos/mo',
        'Drag and Drop AI Builder',
        '100 HD images/mo',
        'Built-in AI copywriting',
        '50 Themes/mo',

        { feature: '24/7 customer support', included: false },

        { feature: 'Dynamic Text Editor', included: false },
        { feature:      ' Image Drag and Drop', included: false },
 
        '200 AI Prompts/mo',
        'Export Code',

        
      ],
      priceId: isYearly
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_YEARLY_PRICE_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_MONTHLY_PRICE_ID,
    },
    {
      title: 'Creator',
      price: isYearly ? '79/mo' : '94/mo',
      description: 'Perfect for creators looking to experiment and expand their toolkit.',
      isPopular: true,
      features: [
        '10 Landing pages',
        '100 Logos/mo',
        'Drag and Drop AI Builder',
        '200 HD images/mo',
        'Built-in AI copywriting',
        '100 Themes/mo',
'24/7 customer support', 

        { feature: 'Dynamic Text Editor', included: false },
        { feature:      ' Image Drag and Drop', included: false },
 
        'Export Code',
        '24/7 customer support',
      ],
      priceId: isYearly
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_YEARLY_PRICE_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_MONTHLY_PRICE_ID,
    },
    {
      title: 'Professional',
      price: isYearly ? '127/mo' : '142/mo',
      description: 'Building for professionals needing advanced tools and premium support.',
      features: [
        'Unlimited Landing pages',
        'Unlimited Logos/mo',
        'Drag and Drop AI Builder',
        'Unlimited HD images/mo',
        'Built-in AI copywriting',
        'Premium Themes',
     'Unlimited AI Prompts',
        'Code Export',
        'Dynamic Text Editor',
        'Image Drag and Drop',
        'Full Acess',

        'Dedicated Support 24/7',
      ],
      priceId: 'concierge-price-id',
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900 py-16 px-8 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Choose the Plan That Suits You Best</h2>
        <p className="text-lg text-gray-500">Step Into the Future of Web Creation with AI</p>
        <p className="text-sm text-gray-400">
          Build forward-thinking landing pages in minutes with AI-generated custom designs. Let AI handle the heavy lifting.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="flex space-x-4 bg-white rounded-full p-1 shadow-lg">
          <button
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              isYearly ? 'bg-blue-600 text-white font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={togglePricing}
          >
            Yearly (Save 20%)
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              !isYearly ? 'bg-blue-600 text-white font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={togglePricing}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative bg-white border rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 ${
              plan.isPopular ? 'border-blue-600' : 'border-gray-200'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm rounded-bl-2xl">
                Most Popular
              </div>
            )}
            <h3 className="text-3xl font-semibold mb-6">{plan.title}</h3>
            <div className="flex items-center space-x-2 mb-6">
              <DollarSign className="text-blue-600" />
              <p className="text-4xl font-bold">{plan.price}</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-center space-x-2 text-gray-700">
                  {typeof feature === 'string' ? (
                    <>
                      <CheckCircle className="text-blue-600" />
                      <span>{feature}</span>
                    </>
                  ) : (
                    <>
                      {feature.included ? (
                        <>
                          <CheckCircle className="text-blue-600" />
                          <span>{feature.feature}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="text-red-600" />
                          <span className="line-through">{feature.feature}</span>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuy(plan.priceId!)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-white font-semibold w-full transition-all"
            >
              {`Choose ${plan.title}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingUI;
