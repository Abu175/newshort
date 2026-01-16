//app/pricing/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
const PricingUI = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  

  const togglePricing = () => {
    setIsYearly(prevState => !prevState);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        setUserId(data.data._id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, []);

 
  const handleBuy = async (priceId: string) => {
    console.log('handleBuy called with priceId:', priceId);
    console.log('Current userId:', userId);

    if (!userId) {
      console.error('User ID is not available');
      toast.error('Please log in to make a purchase');
      // Optionally, redirect to login page
      // router.push('/login');
      return;
    }

    if (!priceId) {
      console.error('Price ID is not available');
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Checkout response:', data);

      if (data.url) {
        window.location.href = data.url; // Redirect user to the Lemon Squeezy checkout page
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      toast.error('Failed to initiate purchase. Please try again.');
    }
  };

  

  return (
    <div className="bg-gradient-to-br from-purple-900 to-amber-900 text-white p-8 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">WᴇʙʟLIx</h2>

      <div className="flex justify-end mb-4">
        <div className="bg-gray-700 rounded-full p-1">
          <button
            className={`bg-gray-200 text-gray-800 px-4 py-1 rounded-full ${isYearly ? 'font-bold' : ''}`}
            onClick={togglePricing}
          >
            Yearly (20% off)
          </button>
          <button
            className={`text-white px-4 py-1 rounded-full ${!isYearly ? 'font-bold' : ''}`}
            onClick={togglePricing}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isYearly ? (
          <>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <ul className="list-disc list-inside">
                <li>30 generations per month</li>
                <li>No commercial use</li>
              </ul>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <p className="text-2xl font-bold mb-1">$9/mo</p>
              <p className="text-sm mb-4">$199 billed yearly</p>
              <ul className="list-disc list-inside">
                <li>120 (+30) generations per month</li>
                <li>High priority generations</li>
                <li>Commercial use permitted</li>
                <li>Remove watermark</li>
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_YEARLY_PRICE_ID!)}
                className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
              >
                Buy Standard
              </button>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-2xl font-bold mb-1">$79.99/mo</p>
              <p className="text-sm mb-4">$959.90 billed yearly</p>
              <ul className="list-disc list-inside">
                <li>400 (+30) generations per month</li>
                <li>Highest priority generations</li>
                <li>Commercial use permitted</li>
                <li>Remove watermark</li>
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_YEARLY_PRICE_ID!)}
                className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
              >
                Buy Pro
              </button>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Premier</h3>
              <p className="text-2xl font-bold mb-1">$399.99/mo</p>
              <p className="text-sm mb-4">$4,799.90 billed yearly</p>
              <ul className="list-disc list-inside">
                <li>2,000 (+30) generations per month</li>
                <li>Highest priority generations</li>
                <li>Commercial use permitted</li>
                <li>Remove watermark</li>
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIER_YEARLY_PRICE_ID!)}
                className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
              >
                Buy Premier
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <ul className="list-disc list-inside">
                <li>30 generations per month</li>
                <li>No commercial use</li>
              </ul>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <p className="text-2xl font-bold mb-1">$29.99/mo</p>
              <ul className="list-disc list-inside">
                <li>120 (+30) generations per month</li>
                <li>High priority generations</li>
                <li>Commercial use permitted</li>
                <li>Remove watermark</li>
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_MONTHLY_PRICE_ID!)}
                className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
              >
                Buy Standard
              </button>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-2xl font-bold mb-1">$99.99/mo</p>
              <ul className="list-disc list-inside">
                <li>400 (+30) generations per month</li>
                <li>Highest priority generations</li>
                <li>Commercial use permitted</li>
                <li>Remove watermark</li>
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_MONTHLY_PRICE_ID!)}
                className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
              >
                Buy Pro
              </button>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Premier</h3>
              <p className="text-2xl font-bold mb-1">$499.99/mo</p>
              <ul className="list-disc list-inside">
                <li>2,000 (+30) generations per month</li>
                <li>Highest priority generations</li>
                <li>Commercial use permitted</li>
                <li>Remove watermark</li>
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIER_MONTHLY_PRICE_ID!)}
                className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
              >
                Buy Premier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PricingUI;


