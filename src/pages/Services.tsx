import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Droplets, 
  DollarSign, 
  Award, 
  FileText, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Droplets,
      title: "تصاريح حفر الآبار",
      titleEn: "Well Drilling Permits",
      description: "احصل على تصريح لحفر بئر مياه جوفية لأغراض الري والزراعة",
      descriptionEn: "Get permits for drilling groundwater wells for irrigation and agricultural purposes",
      duration: "15-30 يوم",
      cost: "50-200 دينار",
      requirements: ["وثيقة ملكية الأرض", "دراسة هيدروجيولوجية", "خريطة الموقع"],
      status: "متوفر"
    },
    {
      icon: DollarSign,
      title: "القروض الزراعية",
      titleEn: "Agricultural Loans",
      description: "قروض ميسرة لتمويل المشاريع الزراعية والثروة الحيوانية",
      descriptionEn: "Facilitated loans for financing agricultural and livestock projects",
      duration: "30-60 يوم",
      cost: "فوائد مخفضة 3-5%",
      requirements: ["دراسة جدوى", "ضمانات", "خبرة زراعية"],
      status: "متوفر"
    },
    {
      icon: Award,
      title: "الدعم الزراعي",
      titleEn: "Agricultural Subsidies",
      description: "دعم مالي للمزارعين لتحسين الإنتاجية ومواجهة التحديات",
      descriptionEn: "Financial support for farmers to improve productivity and face challenges",
      duration: "20-45 يوم",
      cost: "مجاني",
      requirements: ["تسجيل كمزارع", "بيان إنتاج", "فواتير المدخلات"],
      status: "متوفر"
    },
    {
      icon: FileText,
      title: "التراخيص الزراعية",
      titleEn: "Agricultural Licenses",
      description: "تراخيص لممارسة الأنشطة الزراعية والتجارية في القطاع الزراعي",
      descriptionEn: "Licenses for practicing agricultural and commercial activities in the agricultural sector",
      duration: "10-20 يوم",
      cost: "25-100 دينار",
      requirements: ["هوية شخصية", "شهادة خبرة", "موقع مناسب"],
      status: "متوفر"
    }
  ];

  const additionalServices = [
    {
      icon: Users,
      title: "الإرشاد الزراعي",
      description: "خدمات استشارية وإرشادية للمزارعين"
    },
    {
      icon: TrendingUp,
      title: "تسويق المنتجات",
      description: "دعم تسويق المنتجات الزراعية محلياً وإقليمياً"
    },
    {
      icon: CheckCircle,
      title: "ضمان الجودة",
      description: "فحص وضمان جودة المنتجات الزراعية"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-display mb-4">خدماتنا - Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          نقدم مجموعة شاملة من الخدمات لدعم القطاع الزراعي في الأردن
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We provide a comprehensive range of services to support the agricultural sector in Jordan
        </p>
      </div>

      {/* Main Services */}
      <div className="mb-16">
        <h2 className="text-heading-1 mb-8 text-center">الخدمات الرئيسية</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{service.titleEn}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{service.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm mb-2">{service.description}</p>
                    <p className="text-xs text-muted-foreground">{service.descriptionEn}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{service.cost}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">المتطلبات:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {service.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-success" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">
                    تقديم طلب
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Services */}
      <div className="mb-16">
        <h2 className="text-heading-1 mb-8 text-center">خدمات إضافية</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Service Process */}
      <div className="mb-16">
        <h2 className="text-heading-1 mb-8 text-center">خطوات الحصول على الخدمة</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "التسجيل", description: "إنشاء حساب في المنصة" },
            { step: "2", title: "تعبئة الطلب", description: "ملء نموذج الطلب بالمعلومات المطلوبة" },
            { step: "3", title: "رفع المستندات", description: "تحميل المستندات المطلوبة" },
            { step: "4", title: "المتابعة", description: "متابعة حالة الطلب والحصول على النتيجة" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <Card className="bg-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-heading-1 mb-4">تحتاج مساعدة؟</h2>
          <p className="text-muted-foreground mb-6">
            فريقنا جاهز لمساعدتك في أي استفسار حول خدماتنا
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>06-560-0000</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>info@moa.gov.jo</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>عمان، الأردن</span>
            </div>
          </div>
          <Button>
            تواصل معنا
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;