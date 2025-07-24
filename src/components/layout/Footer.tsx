import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: {
      title: "Services",
      titleAr: "الخدمات",
      links: [
        { label: "Farmer Registration", labelAr: "تسجيل المزارعين", href: "/farmer/register" },
        { label: "Licensing", labelAr: "التراخيص", href: "/licensing" },
        { label: "Well Permits", labelAr: "تراخيص الآبار", href: "/wells" },
        { label: "Agricultural Loans", labelAr: "القروض الزراعية", href: "/loans" },
      ],
    },
    support: {
      title: "Support",
      titleAr: "الدعم",
      links: [
        { label: "Help Center", labelAr: "مركز المساعدة", href: "/help" },
        { label: "Contact Us", labelAr: "اتصل بنا", href: "/contact" },
        { label: "FAQ", labelAr: "الأسئلة الشائعة", href: "/faq" },
        { label: "Technical Support", labelAr: "الدعم الفني", href: "/tech-support" },
      ],
    },
    ministry: {
      title: "Ministry",
      titleAr: "الوزارة",
      links: [
        { label: "About Us", labelAr: "من نحن", href: "/about" },
        { label: "News", labelAr: "الأخبار", href: "/news" },
        { label: "Publications", labelAr: "المنشورات", href: "/publications" },
        { label: "Careers", labelAr: "الوظائف", href: "/careers" },
      ],
    },
  };

  return (
    <footer className="bg-surface border-t">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ministry Information */}
          <div className="space-y-4">
            <h3 className="text-heading-2 text-primary">
              وزارة الزراعة
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ministry of Agriculture<br />
              Hashemite Kingdom of Jordan
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Amman, Jordan</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+962 6 568 6151</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@moa.gov.jo</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h4 className="font-semibold text-foreground">
                {section.title} | {section.titleAr}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label} | {link.labelAr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Ministry of Agriculture, Jordan. All rights reserved. | 
              جميع الحقوق محفوظة © {currentYear} وزارة الزراعة، الأردن
            </p>
            
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy | سياسة الخصوصية
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service | شروط الخدمة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;