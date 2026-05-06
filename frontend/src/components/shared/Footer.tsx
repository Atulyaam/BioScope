import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FullLogo from "../../assets/FullLogo.png";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaXTwitter, label: "Twitter" },
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaYoutube, label: "YouTube" },
    { icon: FaPinterest, label: "Pinterest" },
    { icon: FaLinkedin, label: "LinkedIn" },
  ];

  const footerSections = {
    Company: ["About Us", "Contact Us", "Press", "Careers"],
    Help: ["FAQ", "Support", "Feedback", "Report Issue"],
    Legal: ["Terms of Use", "Privacy Policy", "Cookie Policy", "Disclaimer"],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="border-t border-gray-700">
        {/* Main Footer Content */}
        <div className="px-4 md:px-8 py-12">
          <div className="max-w-screen-xl mx-auto">
            {/* Top Section - Logo and Social */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Logo Section */}
              <div className="flex flex-col items-start">
                <img
                  src={FullLogo}
                  alt="BioScope Logo"
                  className="h-16 mb-4 hover:opacity-80 transition-opacity"
                />
                <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                  Your ultimate destination for movies, shows, events, and
                  entertainment experiences.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-start md:items-end">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <button
                        key={index}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-gray-800 text-gray-300 flex items-center justify-center transition-all duration-300 hover:bg-[#f84464] hover:text-white hover:scale-110 active:scale-95"
                      >
                        <Icon size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-800">
              {Object.entries(footerSections).map(([section, links]) => (
                <div key={section}>
                  <h4 className="text-white font-semibold mb-4">{section}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-gray-400 hover:text-[#f84464] transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Section - Copyright and Legal */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} BioScope Pvt. Ltd. All rights
                reserved.
              </p>
              <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
                The content and images used on this site are copyright protected
                and copyrights vest with the respective owners. The usage of the
                content and images on this website is intended to promote the
                works and no endorsement of the artist shall be implied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
