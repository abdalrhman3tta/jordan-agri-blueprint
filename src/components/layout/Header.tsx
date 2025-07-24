import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ministryLogo from "@/assets/ministry-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">("en");
  const location = useLocation();

  const navigationItems = [
    { label: "Home", labelAr: "الرئيسية", href: "/" },
    { label: "Farmer Portal", labelAr: "بوابة المزارعين", href: "/farmer" },
    { label: "Employee Portal", labelAr: "بوابة الموظفين", href: "/employee" },
    { label: "Services", labelAr: "الخدمات", href: "/services" },
    { label: "About", labelAr: "حول الوزارة", href: "/about" },
    { label: "Contact", labelAr: "اتصل بنا", href: "/contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
    // Here you would implement actual i18n language switching
    document.documentElement.dir = language === "en" ? "rtl" : "ltr";
    document.documentElement.lang = language === "en" ? "ar" : "en";
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Ministry Name */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={ministryLogo} 
              alt="Ministry Logo" 
              className="h-10 w-10"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-primary">
                {language === "ar" ? "وزارة الزراعة" : "Ministry of Agriculture"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "المملكة الأردنية الهاشمية" : "Hashemite Kingdom of Jordan"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground"
                }`}
              >
                {language === "ar" ? item.labelAr : item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "ar" ? "English" : "عربي"}</span>
            </Button>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </Button>
              <Button variant="default" size="sm">
                {language === "ar" ? "إنشاء حساب" : "Register"}
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium p-2 rounded-md transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {language === "ar" ? item.labelAr : item.label}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={toggleLanguage}
                      className="w-full justify-start"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {language === "ar" ? "English" : "عربي"}
                    </Button>
                    
                    <Button variant="ghost" className="w-full justify-start mt-2">
                      <User className="h-4 w-4 mr-2" />
                      {language === "ar" ? "تسجيل الدخول" : "Login"}
                    </Button>
                    
                    <Button variant="default" className="w-full mt-2">
                      {language === "ar" ? "إنشاء حساب" : "Register"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;