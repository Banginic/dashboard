import Link from "next/link";
import { ChefHat, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/index";
import { PERSONAL_DATA } from "@/assets/data";

const MainFooter = () => {
    
  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Our Story", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blogs", path: "/press" },
    ],
    products: [
      { name: "Cakes & Desserts", path: "/products" },
      { name: "Fresh Breads", path: "/products" },
      { name: "Pastries", path: "/products" },
      { name: "Catering", path: "/catering" },
    ],
    services: [
      { name: "Custom Orders", path: "/custom-orders" },
      { name: "Wedding Cakes", path: "/wedding-cakes" },
      { name: "Baking Classes", path: "/learning" },
      { name: "Gift Cards", path: "/gift-cards" },
    ],
    support: [
      { name: "Contact Us", path: "/contact" },
      { name: "FAQ", path: "/faq" },
      { name: "Shipping", path: "/shipping" },
      { name: "Returns", path: "/returns" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "YouTube", icon: Youtube, url: "#" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo
              logoSize="size-8"
              textSize="text-xl lg:text-2xl"
              color={"text-yellow-500"}
            />
            <p className="text-muted-foreground mt-1 mb-6 leading-relaxed">
              Creating delicious memories since 2008. From artisan breads to
              custom cakes, we're your neighborhood bakery and restaurant
              committed to quality and community.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-foreground   " />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                                 className="text-muted-foreground hover:text-foreground/80 transition-colors text-sm"

                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-foreground/80 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-foreground/80 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-foreground/80 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cream/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-cream/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {PERSONAL_DATA.title}. All rights
            reserved.
          </div>

          <div className="flex space-x-6 text-sm">
            <Link
              href="/footer/privacy"
              className="text-cream/60 hover:text-golden transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/footer/terms"
              className="text-cream/60 hover:text-golden transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/footer/cookies"
              className="text-cream/60 hover:text-golden transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
