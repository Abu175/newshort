import React from 'react';

interface SearchResultProps {
  title: string;
  url: string;
  description: string;
}
import Head from 'next/head';

const SearchResult: React.FC<SearchResultProps> = ({ title, url, description }) => {
  return (
    <article className="search-result p-4 border-b border-gray-200" itemScope itemType="http://schema.org/Article">
      <h2 itemProp="headline">
        <a href={url} className="title text-blue-600 text-lg font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h2>
      <link itemProp="url" href={url} />
      <p className="url text-sm text-gray-500">{new URL(url).hostname}</p>
      <p className="description text-gray-700 mt-2" itemProp="description">{description}</p>
    </article>
  );
};

const SearchResultsPage: React.FC = () => {
  const results = [
    {
      title: 'Best Medium Hairstyles for Women in 2024',
      url: 'https://www.webllix.com',
      description: 'Discover the top medium hairstyles for women in 2024. Our guide offers versatile and stylish looks perfect for balancing short and long styles.',
    },
    {
      title: 'Trendy Short Hairstyles for Women: 2024 Edition',
      url: 'https://www.thechatpdf.com/hairstyles/short-hairstyles-for-women',
      description: 'Explore the latest short hairstyles for women in 2024. Learn how to embrace your natural texture for effortlessly stylish looks.',
    },
    {
      title: '5 Bubble Braid Tutorials for All Hair Types',
      url: 'https://www.tryhairstyle.com/hairstyles/bubble-braids-tutorials',
      description: 'Master the trendy bubble braid with our step-by-step tutorials. Find the perfect style for your hair type and avoid common styling mistakes.',
    },
    {
      title: 'Megan Fox\'s 43 Most Iconic Hairstyles: A Celebrity Hair Guide',
      url: 'https://www.tryhairstyle.com/celebrity-hairstyles/megan-fox',
      description: 'Explore 43 of Megan Fox\'s most memorable hairstyles, from her signature long locks to edgy short cuts. Get inspired for your next salon visit!',
    },
    {
      title: 'Braids with Curls: Stunning Hairstyles for 2024',
      url: 'https://www.tryhairstyle.com/hairstyles/braids-with-curls',
      description: 'Create head-turning looks with our guide to braids with curls. Learn how to accessorize your braided hairstyles for a complete, on-trend appearance.',
    },
  ];

  const pageTitle = "Top Hairstyles for Women in 2024 | TryHairstyle.com";
  const pageDescription = "Discover the latest and most popular hairstyles for women in 2024. From medium and short cuts to trendy bubble braids and celebrity-inspired looks.";

  return (
    <>
        <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.tryhairstyle.com/top-hairstyles-for-women" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tryhairstyle.com/top-hairstyles-for-women" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        </Head>
      <div className="search-results-page max-w-4xl mx-auto my-10">
     
        
        {results.map((result, index) => (
          <SearchResult
            key={index}
            title={result.title}
            url={result.url}
            description={result.description}
          />
        ))}
      </div>
    </>
  );
};

export default SearchResultsPage;