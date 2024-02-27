import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8 ">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-3 ">
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">Email: deepakjethi@yahoo.com</p>
          <p className="text-sm">Phone: +91 -8865-9197-03</p>
          <p className="text-sm">Vasanth Enclave , Dehradun</p>
        </div>

        <div>
          <h3 className="text-xl font-bold sm:mb-4 mb-2">Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="text-sm">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-sm">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="text-sm">
                Blog
              </a>
            </li>
            <li>
              <a href="/vlogs" className="text-sm">
                Vlogs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold sm:mb-4 mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm">
              Facebook
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm">
              Twitter
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm">
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold sm:mb-4 mb-1">
            Subscribe to Our Newsletter
          </h3>
        </div>
      </div>

      <div className="sm:mt-8 mt-2 text-center text-sm">
        <p>&copy; 2024 Bloggers. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}

export default Footer;
