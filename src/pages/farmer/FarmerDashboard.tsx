import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Droplets,
  Plus,
  Download,
  Eye,
  Calendar,
  MapPin,
  Thermometer,
  CloudRain
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useApplications";
import { useTranslation } from "react-i18next";

const FarmerDashboard = () => {
  const { profile } = useAuth();
  const { applications, loading } = useApplications();
  const { t } = useTranslation();

  const quickActions = [
    {
      title: "New Application",
      titleAr: "طلب جديد",
      description: "Submit a new application",
      descriptionAr: "تقديم طلب جديد",
      href: "/farmer/applications/new",
      icon: Plus,
      color: "bg-primary"
    },
    {
      title: "Well Permit",
      titleAr: "ترخيص بئر",
      description: "Apply for water well permit",
      descriptionAr: "تقدم بطلب ترخيص بئر مياه",
      href: "/farmer/wells",
      icon: Droplets,
      color: "bg-blue-600"
    },
    {
      title: "Loan Application",
      titleAr: "طلب قرض",
      description: "Apply for agricultural loan",
      descriptionAr: "تقدم بطلب قرض زراعي",
      href: "/farmer/loans",
      icon: TrendingUp,
      color: "bg-green-600"
    }
  ];

  const recentDocuments = [
    {
      name: "Well Permit Certificate",
      nameAr: "شهادة ترخيص البئر",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-01-15"
    },
    {
      name: "Land Ownership Deed",
      nameAr: "صك ملكية الأرض",
      type: "PDF", 
      size: "1.8 MB",
      date: "2024-01-12"
    },
    {
      name: "Farm Registration",
      nameAr: "تسجيل المزرعة",
      type: "PDF",
      size: "950 KB",
      date: "2024-01-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "under_review": return "bg-yellow-100 text-yellow-800"; 
      case "pending": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return CheckCircle;
      case "under_review": return Clock;
      case "pending": return AlertCircle;
      case "rejected": return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-1 mb-2">
          {t('farmer.dashboard')}
        </h1>
        <p className="text-muted-foreground">
          {t('farmer.welcome')}
          {profile && (
            <span className="block text-sm mt-1">
              Welcome back, {profile.full_name}!
            </span>
          )}
        </p>
      </div>

      {/* Weather Alert */}
      <Alert className="mb-6 border-blue-200 bg-blue-50">
        <CloudRain className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>Weather Alert:</strong> Rain expected in your area tomorrow. 
              Consider adjusting irrigation schedule.
              <br />
              <span className="text-sm">تنبيه طقس: أمطار متوقعة في منطقتك غداً. فكر في تعديل جدول الري</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Thermometer className="h-4 w-4" />
                <span>22°C</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Amman</span>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Applications & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions | إجراءات سريعة</CardTitle>
              <CardDescription>
                Start new applications or access frequently used services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="block p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                  >
                    <div className={`${action.color} text-white p-3 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {action.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.descriptionAr}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Applications Status */}
          <Card>
            <CardHeader>
              <CardTitle>My Applications | طلباتي</CardTitle>
              <CardDescription>
                Track the status of your submitted applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">{t('common.loading')}</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No applications found</p>
                    <Button asChild className="mt-4">
                      <Link to="/farmer/applications/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Application
                      </Link>
                    </Button>
                  </div>
                ) : (
                  applications.slice(0, 3).map((app) => {
                    const StatusIcon = getStatusIcon(app.status);
                    const progress = app.status === 'completed' ? 100 : 
                                   app.status === 'approved' ? 100 :
                                   app.status === 'under_review' ? 60 :
                                   app.status === 'pending' ? 20 : 0;
                    
                    return (
                      <div key={app.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{app.title}</h4>
                            <p className="text-sm text-muted-foreground">ID: {app.id.slice(-8)}</p>
                          </div>
                          <Badge className={getStatusColor(app.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {app.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{t('farmer.progress')}</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <span className="text-sm text-muted-foreground">
                            {t('farmer.submitted')}: {new Date(app.submitted_at).toLocaleDateString()}
                          </span>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            {t('farmer.viewDetails')}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full" asChild>
                  <Link to="/farmer/applications">
                    View All Applications | عرض جميع الطلبات
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Documents & Stats */}
        <div className="space-y-6">
          {/* Farm Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Overview | نظرة على المزرعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">15.5</div>
                <div className="text-sm text-muted-foreground">
                  Hectares | هكتار
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-700">3</div>
                  <div className="text-xs text-green-600">Active Wells | آبار نشطة</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-700">2</div>
                  <div className="text-xs text-blue-600">Crops | محاصيل</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents | الوثائق الحديثة</CardTitle>
              <CardDescription>
                Your recently uploaded or downloaded documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.nameAr}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/farmer/documents">
                  View All Documents | عرض جميع الوثائق
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming | القادم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Site Inspection</p>
                    <p className="text-xs text-muted-foreground">معاينة الموقع</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Document Review</p>
                    <p className="text-xs text-muted-foreground">مراجعة الوثائق</p>
                    <p className="text-xs text-muted-foreground">Jan 25 at 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;