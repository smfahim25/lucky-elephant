"use client";
import { usePathname, useRouter } from "next/navigation"; // Use Router and Pathname

// Exporting footer links correctly
export const footerLinksV1 = [
  { title: "Home", url: "/" },
  { title: "About", url: "/#about" },
  { title: "Roadmap", url: "/#roadmap" },
  { title: "FAQ", url: "/#faq" },
  { title: "Blog", url: "/blogs" },
 ,
];

// FooterLinks component that uses the links
const FooterLinks = () => {
  const router = useRouter(); // For programmatic navigation
  const pathname = usePathname(); // Get the current path

  const handleNavigation = (url) => {
    if (url.startsWith("/#")) {
      // If it's a section on the home page and we're not on "/"
      if (pathname !== "/") {
        router.push("/"); // Go to home page first
        setTimeout(() => {
          window.location.hash = url.split("#")[1]; // Scroll to section
        }, 100); // Small delay for route change
      } else {
        // Already on home page, just scroll
        window.location.hash = url.split("#")[1];
      }
    } else {
      // For other links, navigate normally
      router.push(url);
    }
  };

  return (
    <div className="footer_links">
      {footerLinksV1.map((item, i) => (
        <button key={i} onClick={() => handleNavigation(item.url)}>
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default FooterLinks;
