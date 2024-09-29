import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-300 text-white p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-400">
            {/* Section 1: Customer Service */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2 text-black">Customer Service</h3>
              <ul>
                <li>
                  <Link href="/help-center">Help Center</Link>
                </li>
                <li>
                  <Link href="/track-order">Track Your Order</Link>
                </li>
                <li>
                  <Link href="/returns">Returns & Refunds</Link>
                </li>
                <li>
                  <Link href="/faqs">FAQs</Link>
                </li>
              </ul>
            </div>

            {/* Section 2: About Us */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2 text-black">About Lazada</h3>
              <ul>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>

            {/* Section 3: Social Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2 text-black">Follow Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                </li>
                <li>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li>
                <li>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
              </ul>
            </div>

            {/* Section 4: Legal Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2 text-black">Legal</h3>
              <ul>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center mt-6 text-gray-500">
            <p>&copy; 2024 Lazada. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
