import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslation } from "@/hooks/useTranslation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();
  const { language, isRTL } = useLanguage();
  const [location] = useLocation();
  const { t } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle menu item click (close mobile menu)
  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  // Check if the current route is active
  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
      data-rtl={isRTL}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="gradient-text">Core</span> Tech
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`font-medium transition-colors ${isActive("/") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.home")}
              </a>
            </Link>
            <Link href="/services">
              <a className={`font-medium transition-colors ${isActive("/services") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.services")}
              </a>
            </Link>
            <Link href="/portfolio">
              <a className={`font-medium transition-colors ${isActive("/portfolio") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.portfolio")}
              </a>
            </Link>
            <Link href="/pricing">
              <a className={`font-medium transition-colors ${isActive("/pricing") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.pricing")}
              </a>
            </Link>
            <Link href="/testimonials">
              <a className={`font-medium transition-colors ${isActive("/testimonials") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.testimonials")}
              </a>
            </Link>
            <Link href="/blog">
              <a className={`font-medium transition-colors ${isActive("/blog") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.blog")}
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium transition-colors ${isActive("/about") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.about")}
              </a>
            </Link>
            <Link href="/contact">
              <a className={`font-medium transition-colors ${isActive("/contact") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}>
                {t("nav.contact")}
              </a>
            </Link>
          </nav>

          {/* Settings */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-800 shadow-lg absolute w-full transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link href="/">
            <a 
              className={`block py-2 font-medium ${isActive("/") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.home")}
            </a>
          </Link>
          <Link href="/services">
            <a 
              className={`block py-2 font-medium ${isActive("/services") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.services")}
            </a>
          </Link>
          <Link href="/portfolio">
            <a 
              className={`block py-2 font-medium ${isActive("/portfolio") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.portfolio")}
            </a>
          </Link>
          <Link href="/pricing">
            <a 
              className={`block py-2 font-medium ${isActive("/pricing") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.pricing")}
            </a>
          </Link>
          <Link href="/testimonials">
            <a 
              className={`block py-2 font-medium ${isActive("/testimonials") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.testimonials")}
            </a>
          </Link>
          <Link href="/blog">
            <a 
              className={`block py-2 font-medium ${isActive("/blog") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.blog")}
            </a>
          </Link>
          <Link href="/about">
            <a 
              className={`block py-2 font-medium ${isActive("/about") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.about")}
            </a>
          </Link>
          <Link href="/contact">
            <a 
              className={`block py-2 font-medium ${isActive("/contact") ? "text-primary-600 dark:text-primary-400" : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"}`}
              onClick={handleMenuItemClick}
            >
              {t("nav.contact")}
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;