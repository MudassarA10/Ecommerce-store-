import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useMemo } from "react";
import i18n from "../common/components/LangConfig";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  const accountLinks = useMemo(
    () => [
      { name: i18n.t("footer.cart"), to: "/cart" },
      { name: i18n.t("footer.wishlist"), to: "/wishlist" },
      { name: i18n.t("footer.shop"), to: "/category" },
    ],
    []
  );

  const quickLinks = useMemo(
    () => [
      { name: i18n.t("allProducts.redTitle"), to: "/allProducts" },
      { name: i18n.t("category.redTitle"), to: "/category" },
      { name: i18n.t("footer.usage"), to: "/about" },
      { name: i18n.t("footer.FAQ"), to: "/about" },
      { name: i18n.t("footer.Contact"), to: "/contact" },
    ],
    []
  );

  const LinkList = ({ title, links }) => (
    <div className="space-y-3">
      <h3 className="text-lg font-bold hover:text-[#ef2e2e] cursor-pointer text-nowrap">
        {title}
      </h3>
      <div className="w-28 h-1 bg-[#ef2e2e]" />
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name} className="flex items-center ">
            <FiChevronRight className="text-red-500 mr-2" />
            <Link
              to={link.to}
              className="text-gray-400 hover:text-red-500"
              onClick={scrollToTop}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="text-gray-200 bg-gray-900 pt-12 pb-6 mt-8" id="footer">
      <div className=" mx-auto px-6 lg:px-20 space-y-12">
        {/* Flexbox for 3 sections with even spacing */}
        <div className="flex justify-between flex-wrap gap-10">
          {/* Left: Logo and About Section */}
          <div className="flex flex-col space-y-4 max-w-sm">
            <div className="  items-center   gap-3 flex">
              <Link href="/">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="19" cy="19" r="19" fill="#DB4444" />
                  <path
                    d="M19 29C14.03 29 10 26.418 10 22V21.912C10 19.794 11.338 18.1 13.375 17C15.324 15.948 16.476 14.01 16.188 12L15.625 9L17.711 9.795C21.468 11.225 24.597 13.707 26.625 16.861C27.5167 18.2311 27.9941 19.8293 28 21.464V22C28 23.562 27.496 24.895 26.625 25.965"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 29C17.343 29 16 27.567 16 25.8C16 24.4 17.016 23.279 17.91 22.252L19 21L20.09 22.252C20.984 23.28 22 24.4 22 25.8C22 27.567 20.657 29 19 29Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <h1 className="font-inter font-bold text-2xl ">Zaim Store </h1>
            </div>
            <div className="w-52 sm:w-52 h-1 bg-[#ef2e2e]"></div>{" "}
            {/* Purple line below logo */}
            <p className="text-white text-[0.94rem] font-light  max-w-[29rem] sm:w-80">
              Zaim Store offers a seamless shopping experience with
              top-quality products at great prices. Enjoy fast shipping, secure
              payments, and excellent customer service!
            </p>
          </div>

          {/* Middle: Account Links */}
          <div>
            <LinkList title="ACCOUNT" links={accountLinks} />
          </div>

          {/* Right: Quick Links */}
          <div>
            <LinkList title="QUICK LINKS" links={quickLinks} />
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-white">
            © {new Date().getFullYear()} Copyright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
