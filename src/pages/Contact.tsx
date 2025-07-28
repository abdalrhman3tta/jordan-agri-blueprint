import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Building2, 
  Send,
  Facebook,
  Twitter,
  Youtube,
  Instagram
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "الهاتف",
      titleEn: "Phone",
      details: ["+962 6 560 0000", "+962 6 560 0001"],
      description: "خط المساعدة متاح 24/7"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      titleEn: "Email",
      details: ["info@moa.gov.jo", "support@moa.gov.jo"],
      description: "نرد خلال 24 ساعة"
    },
    {
      icon: MapPin,
      title: "العنوان",
      titleEn: "Address",
      details: ["شارع الأميرة هيا بنت الحسين", "عمان 11181، الأردن"],
      description: "المقر الرئيسي للوزارة"
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      titleEn: "Working Hours",
      details: ["الأحد - الخميس: 8:00 - 15:00", "الجمعة - السبت: مغلق"],
      description: "أوقات الدوام الرسمي"
    }
  ];

  const departments = [
    { value: "general", label: "استفسار عام - General Inquiry" },
    { value: "permits", label: "التصاريح والتراخيص - Permits & Licenses" },
    { value: "loans", label: "القروض الزراعية - Agricultural Loans" },
    { value: "subsidies", label: "الدعم الزراعي - Agricultural Subsidies" },
    { value: "technical", label: "الدعم التقني - Technical Support" },
    { value: "complaints", label: "الشكاوى - Complaints" }
  ];

  const offices = [
    {
      name: "مكتب عمان",
      address: "شارع الأميرة هيا، عمان",
      phone: "06-560-0000",
      email: "amman@moa.gov.jo"
    },
    {
      name: "مكتب إربد",
      address: "وسط البلد، إربد",
      phone: "02-724-0000",
      email: "irbid@moa.gov.jo"
    },
    {
      name: "مكتب الكرك",
      address: "شارع الملك الحسين، الكرك",
      phone: "03-235-0000",
      email: "karak@moa.gov.jo"
    },
    {
      name: "مكتب العقبة",
      address: "المنطقة الاقتصادية الخاصة، العقبة",
      phone: "03-209-0000",
      email: "aqaba@moa.gov.jo"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#", color: "text-blue-600" },
    { icon: Twitter, name: "Twitter", url: "#", color: "text-blue-400" },
    { icon: Youtube, name: "YouTube", url: "#", color: "text-red-600" },
    { icon: Instagram, name: "Instagram", url: "#", color: "text-pink-600" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-display mb-4">تواصل معنا - Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو مساعدة تحتاجها
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                إرسال رسالة
              </CardTitle>
              <CardDescription>
                املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+962 7X XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">القسم المختص</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع *</Label>
                  <Input
                    id="subject"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة *</Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  إرسال الرسالة - Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{info.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{info.titleEn}</p>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm">{detail}</p>
                      ))}
                      <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>تابعنا على</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button key={index} variant="outline" className="justify-start">
                      <Icon className={`h-4 w-4 mr-2 ${social.color}`} />
                      {social.name}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <Phone className="h-8 w-8 text-destructive mx-auto mb-2" />
                <h3 className="font-semibold text-destructive mb-1">خط الطوارئ</h3>
                <p className="text-2xl font-bold">911</p>
                <p className="text-xs text-muted-foreground">للحالات الطارئة فقط</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Regional Offices */}
      <div className="mt-16">
        <h2 className="text-heading-1 text-center mb-8">المكاتب الإقليمية</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {office.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{office.email}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-heading-1 text-center mb-8">موقعنا على الخريطة</h2>
        <Card>
          <CardContent className="p-0">
            <div className="bg-muted/30 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">خريطة تفاعلية قريباً</p>
                <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;