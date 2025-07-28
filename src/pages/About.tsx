import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  TrendingUp, 
  Globe,
  Calendar,
  MapPin,
  Building2,
  Leaf
} from "lucide-react";

const About = () => {
  const milestones = [
    { year: "1950", event: "تأسيس وزارة الزراعة الأردنية" },
    { year: "1985", event: "إطلاق برامج الدعم الزراعي" },
    { year: "2010", event: "تحديث قوانين استخدام المياه" },
    { year: "2020", event: "إطلاق الاستراتيجية الزراعية 2025" },
    { year: "2024", event: "إطلاق المنصة الرقمية الموحدة" }
  ];

  const departments = [
    {
      icon: Leaf,
      name: "الإنتاج النباتي",
      description: "مراقبة وتطوير إنتاج المحاصيل الزراعية"
    },
    {
      icon: Building2,
      name: "الثروة الحيوانية",
      description: "تنمية وتطوير الثروة الحيوانية والداجنة"
    },
    {
      icon: Users,
      name: "الإرشاد الزراعي",
      description: "تقديم الخدمات الإرشادية للمزارعين"
    },
    {
      icon: Globe,
      name: "التسويق الزراعي",
      description: "دعم تسويق المنتجات الزراعية محلياً وإقليمياً"
    }
  ];

  const statistics = [
    { number: "500,000", label: "مزارع مسجل", labelEn: "Registered Farmers" },
    { number: "2.5M", label: "دونم مزروع", labelEn: "Cultivated Dunums" },
    { number: "150,000", label: "رأس ماشية", labelEn: "Livestock Head" },
    { number: "85%", label: "الاكتفاء الذاتي", labelEn: "Self-Sufficiency" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-display mb-4">عن وزارة الزراعة</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          وزارة الزراعة الأردنية تعمل منذ عقود على تطوير القطاع الزراعي ودعم المزارعين لتحقيق الأمن الغذائي والتنمية المستدامة
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="text-center pt-6">
                <div className="text-2xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.labelEn}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-primary/5">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-heading-1">رسالتنا</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              تطوير القطاع الزراعي الأردني من خلال تقديم الخدمات المتميزة، والدعم التقني، والسياسات المبتكرة التي تضمن الاستدامة والأمن الغذائي للمملكة الأردنية الهاشمية.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/5">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary/10 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="text-heading-1">رؤيتنا</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              أن نكون الوزارة الرائدة في المنطقة في تحقيق التنمية الزراعية المستدامة، وبناء قطاع زراعي حديث ومتطور يساهم في الاقتصاد الوطني ويحقق الأمن الغذائي.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-heading-1 text-center mb-8">قيمنا الأساسية</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "التميز",
              description: "نسعى للتميز في تقديم الخدمات والحلول المبتكرة"
            },
            {
              icon: Users,
              title: "الشراكة",
              description: "نؤمن بأهمية الشراكة مع المزارعين والقطاع الخاص"
            },
            {
              icon: TrendingUp,
              title: "الاستدامة",
              description: "نلتزم بالممارسات المستدامة في الزراعة والبيئة"
            }
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Departments */}
      <div className="mb-16">
        <h2 className="text-heading-1 text-center mb-8">الأقسام الرئيسية</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                      <p className="text-muted-foreground text-sm">{dept.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-heading-1 text-center mb-8">مسيرة التطوير</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-center">
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 ml-auto text-left'}`}>
                  <Card>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">
                        {milestone.year}
                      </Badge>
                      <p className="text-sm">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Message */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-heading-1 mb-4">كلمة الوزير</h2>
          <blockquote className="text-lg italic text-muted-foreground max-w-3xl mx-auto mb-6">
            "نحن في وزارة الزراعة ملتزمون بخدمة المزارعين الأردنيين وتطوير القطاع الزراعي ليواكب التطورات العالمية ويحقق الأمن الغذائي لبلدنا الحبيب."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div>
              <p className="font-semibold">معالي الدكتور خالد الحنيفات</p>
              <p className="text-sm text-muted-foreground">وزير الزراعة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;