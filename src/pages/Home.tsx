import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Shield, 
  Globe, 
  ArrowRight, 
  TrendingUp, 
  Award,
  Leaf,
  Droplets,
  Tractor,
  BarChart3,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const Home = () => {
  const services = [
    {
      icon: Users,
      title: "Farmer Registration",
      titleAr: "تسجيل المزارعين",
      description: "Register as a farmer and access all agricultural services",
      descriptionAr: "سجل كمزارع واحصل على جميع الخدمات الزراعية",
      href: "/farmer/register",
      color: "text-green-600"
    },
    {
      icon: FileText,
      title: "Licensing Services",
      titleAr: "خدمات التراخيص",
      description: "Apply for agricultural licenses and permits",
      descriptionAr: "تقدم بطلب للحصول على التراخيص والتصاريح الزراعية",
      href: "/licensing",
      color: "text-blue-600"
    },
    {
      icon: Droplets,
      title: "Well Permits",
      titleAr: "تراخيص الآبار",
      description: "Water well drilling and usage permits",
      descriptionAr: "تراخيص حفر واستخدام آبار المياه",
      href: "/wells",
      color: "text-cyan-600"
    },
    {
      icon: TrendingUp,
      title: "Agricultural Loans",
      titleAr: "القروض الزراعية",
      description: "Financial support for agricultural projects",
      descriptionAr: "الدعم المالي للمشاريع الزراعية",
      href: "/loans",
      color: "text-purple-600"
    }
  ];

  const statistics = [
    { label: "Registered Farmers", labelAr: "المزارعون المسجلون", value: "12,500+", icon: Users },
    { label: "Active Licenses", labelAr: "التراخيص النشطة", value: "8,200+", icon: Shield },
    { label: "Processing Time", labelAr: "وقت المعالجة", value: "2-5 Days", icon: Clock },
    { label: "Success Rate", labelAr: "معدل النجاح", value: "98%", icon: Award },
  ];

  const features = [
    {
      icon: Globe,
      title: "Digital Transformation",
      titleAr: "التحول الرقمي",
      description: "Modern digital services for the agricultural sector",
      descriptionAr: "خدمات رقمية حديثة للقطاع الزراعي"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      titleAr: "آمن وموثوق",
      description: "Government-level security for your data",
      descriptionAr: "أمان على مستوى حكومي لبياناتك"
    },
    {
      icon: BarChart3,
      title: "Real-time Tracking",
      titleAr: "التتبع المباشر",
      description: "Track your applications and requests in real-time",
      descriptionAr: "تتبع طلباتك ومعاملاتك في الوقت الفعلي"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            Digital Agriculture Platform | منصة الزراعة الرقمية
          </Badge>
          
          <h1 className="text-display mb-6 max-w-4xl mx-auto">
            <span className="block text-primary">وزارة الزراعة الأردنية</span>
            <span className="block text-foreground mt-2">
              Ministry of Agriculture Jordan
            </span>
          </h1>
          
          <p className="text-body-large text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Your gateway to modern agricultural services. Access licensing, permits, 
            registrations, and support through our comprehensive digital platform.
            <br className="hidden sm:block" />
            <span className="text-sm mt-2 block">
              بوابتك للخدمات الزراعية الحديثة. احصل على التراخيص والتصاريح والتسجيل والدعم
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-elegant hover:shadow-glow transition-all duration-300" asChild>
              <Link to="/farmer">
                Start as Farmer | ابدأ كمزارع
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/employee">
                Employee Portal | بوابة الموظفين
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-surface/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    <div>{stat.label}</div>
                    <div className="text-xs mt-1">{stat.labelAr}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-1 mb-4">
              Our Services | خدماتنا
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital services designed to support Jordan's agricultural community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <service.icon className={`h-12 w-12 ${service.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <CardTitle className="text-lg">
                    <div>{service.title}</div>
                    <div className="text-sm font-normal text-muted-foreground mt-1">
                      {service.titleAr}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    <div className="mb-2">{service.description}</div>
                    <div className="text-xs">{service.descriptionAr}</div>
                  </CardDescription>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-1 mb-4">
              Why Choose Our Platform | لماذا تختار منصتنا
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and designed for the future of agriculture in Jordan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  <div>{feature.title}</div>
                  <div className="text-base font-normal text-muted-foreground mt-1">
                    {feature.titleAr}
                  </div>
                </h3>
                <p className="text-muted-foreground">
                  <div className="mb-2">{feature.description}</div>
                  <div className="text-sm">{feature.descriptionAr}</div>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-heading-1 mb-6">
            Ready to Get Started? | مستعد للبدء؟
          </h2>
          <p className="text-body-large mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers and agricultural professionals who trust our platform for their needs.
            <br />
            انضم إلى آلاف المزارعين والمهنيين الزراعيين الذين يثقون في منصتنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/farmer/register">
                Register as Farmer | سجل كمزارع
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">
                Contact Support | اتصل بالدعم
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;