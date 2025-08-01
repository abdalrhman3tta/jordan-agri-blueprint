import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, User, LogOut, Bell } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NotificationCenter } from "./NotificationCenter";
import ministryLogo from "@/assets/ministry-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const getNavigationItems = () => {
    const baseItems = [
      { label: t('nav.home', 'Home'), href: "/" },
      { label: t('nav.services', 'Services'), href: "/services" },
      { label: t('nav.about', 'About'), href: "/about" },
      { label: t('nav.contact', 'Contact'), href: "/contact" },
    ];

    if (user && profile) {
      if (profile.role === 'farmer') {
        baseItems.splice(1, 0, { label: t('nav.farmerPortal', 'Farmer Portal'), href: "/farmer" });
      } else if (profile.role === 'employee' || profile.role === 'supervisor') {
        baseItems.splice(1, 0, { label: t('nav.employeePortal', 'Employee Portal'), href: "/employee" });
      } else if (profile.role === 'admin') {
        baseItems.splice(1, 0, 
          { label: t('nav.adminPortal', 'Admin Portal'), href: "/admin" },
          { label: t('nav.employeePortal', 'Employee Portal'), href: "/employee" }
        );
      }
    }

    return baseItems;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = getNavigationItems();

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
                {t('ministry.name', 'Ministry of Agriculture')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('ministry.country', 'Hashemite Kingdom of Jordan')}
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
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageSwitcher />

            {/* Notifications for authenticated users */}
            {user && <NotificationCenter />}

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {t('common.welcome', 'Welcome')}, {profile?.full_name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('auth.signOut', 'Sign Out')}
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth/login">
                    <User className="h-4 w-4 mr-2" />
                    {t('auth.signIn', 'Sign In')}
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/auth/register">
                    {t('auth.register', 'Register')}
                  </Link>
                </Button>
              </div>
            )}

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
                      {item.label}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <LanguageSwitcher />
                    
                    {user ? (
                      <>
                        <div className="text-sm text-muted-foreground mb-2">
                          {t('common.welcome', 'Welcome')}, {profile?.full_name}
                        </div>
                        <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start">
                          <LogOut className="h-4 w-4 mr-2" />
                          {t('auth.signOut', 'Sign Out')}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" className="w-full justify-start mt-2" asChild>
                          <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                            <User className="h-4 w-4 mr-2" />
                            {t('auth.signIn', 'Sign In')}
                          </Link>
                        </Button>
                        
                        <Button variant="default" className="w-full mt-2" asChild>
                          <Link to="/auth/register" onClick={() => setIsOpen(false)}>
                            {t('auth.register', 'Register')}
                          </Link>
                        </Button>
                      </>
                    )}
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