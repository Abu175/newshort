import React from "react";
import Logo from "@/app/UI/logo/page";

const Footer = () => {
  return (
    <footer className="px-8 divide-y bg-white text-black">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="flex items-center space-x-4">
          <Logo />
          <span className="ml-2 text-black text-2xl font-semibold">WᴇʙʟLix</span>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50">Product</h3>
            <ul className="space-y-1 text-black">
              <li>
                <a rel="noopener noreferrer" href="/blog">Features</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/">Integrations</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/pricing">Pricing</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50">Company</h3>
            <ul className="space-y-1 text-black">
              <li>
                <a rel="noopener noreferrer" href="/PrivacyPolicy">Privacy</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/TermsAndConditions">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50">Developers</h3>
            <ul className="space-y-1 text-black">
              <li>
                <a rel="noopener noreferrer" href="/blog">Blog</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/">Documentation</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/blog">Guides</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-50">Social Media</div>
            <div className="flex justify-start space-x-3 text-black">
              <a
                rel="noopener noreferrer"
                href="#"
                title="Facebook"
                className="flex items-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                  aria-label="Facebook"
                >
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://x.com/webllix"
                title="Twitter"
                className="flex items-center p-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                  aria-label="Twitter"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://instagram.com/webllix"
                title="Instagram"
                className="flex items-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                  aria-label="In"
                >
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.781-1.443-2.833-1.849-1.020-0.391-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 1.686c4.186 0 4.647 0.018 6.290 0.089 1.482 0.07 2.581 0.287 3.380 0.629 0.799 0.346 1.489 0.785 2.167 1.446 0.712 0.651 1.301 1.445 1.738 2.232 0.435 0.788 0.781 1.563 0.949 2.334 0.19 1.112 0.344 2.231 0.423 3.401 0.062 1.104 0.092 2.243 0.092 6.593s-0.028 5.419-0.092 6.593c-0.077 1.158-0.206 2.292-0.387 3.401-0.187 0.823-0.482 1.646-0.878 2.438-0.402 0.751-0.873 1.475-1.418 2.189-0.605 0.782-1.234 1.532-1.922 2.244-0.753 0.707-1.589 1.318-2.438 1.832-0.716 0.414-1.476 0.736-2.247 0.949-0.8 0.234-1.61 0.393-2.426 0.468-1.636 0.162-2.765 0.195-5.959 0.195-3.228 0-4.514-0.033-5.895-0.195-0.815-0.075-1.616-0.234-2.419-0.468-0.766-0.219-1.519-0.548-2.247-0.949-0.85-0.511-1.685-1.122-2.438-1.832-0.688-0.712-1.317-1.462-1.922-2.244-0.547-0.716-1.016-1.438-1.418-2.189-0.396-0.792-0.690-1.615-0.878-2.438-0.181-1.109-0.309-2.243-0.387-3.401-0.064-1.174-0.092-2.406-0.092-6.593s0.028-5.419 0.092-6.593c0.071-1.179 0.238-2.292 0.423-3.401 0.182-0.791 0.485-1.564 0.949-2.334 0.437-0.787 1.027-1.581 1.738-2.232 0.678-0.661 1.368-1.100 2.167-1.446 0.799-0.346 1.898-0.559 3.380-0.629 1.641-0.071 2.749-0.089 6.290-0.089zM16 12.65a3.35 3.35 0 1 0 0 6.701 3.35 3.35 0 0 0 0-6.701zM16 15.888a1.888 1.888 0 1 1 0 3.776 1.888 1.888 0 0 1 0-3.776z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center text-black">
        © {new Date().getFullYear()} Webllix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
