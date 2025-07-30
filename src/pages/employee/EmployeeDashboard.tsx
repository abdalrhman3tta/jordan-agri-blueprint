import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Bell,
  Mail,
  User,
  Building2,
  Coffee,
  Car,
  Plus
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { useTranslation } from "react-i18next";

const EmployeeDashboard = () => {
  const { profile } = useAuth();
  const { tasks, loading: tasksLoading } = useTasks();
  const { leaveRequests, loading: leaveLoading } = useLeaveRequests();
  const { t } = useTranslation();

  const myTasks = tasks.filter(task => task.assigned_to === profile?.id);

  const quickStats = [
    { 
      title: t('employee.leaveBalance'), 
      value: "18", 
      subtitle: "يوم", 
      icon: Calendar, 
      color: "text-blue-600" 
    },
    { 
      title: t('employee.pendingTasks'), 
      value: myTasks.filter(task => task.status !== 'completed').length.toString(), 
      subtitle: "مهمة", 
      icon: FileText, 
      color: "text-orange-600" 
    },
    { 
      title: "الطلبات المعتمدة", 
      value: leaveRequests.filter(req => req.status === 'approved').length.toString(), 
      subtitle: "طلب", 
      icon: CheckCircle, 
      color: "text-green-600" 
    },
    { 
      title: "الاجتماعات القادمة", 
      value: "3", 
      subtitle: "اجتماع", 
      icon: Users, 
      color: "text-purple-600" 
    }
  ];

  const pendingTasks = [
    { 
      id: 1, 
      title: "مراجعة طلبات تصاريح الآبار", 
      priority: "عاجل", 
      dueDate: "2024-01-30",
      type: "review"
    },
    { 
      id: 2, 
      title: "إعداد تقرير الإنتاج الشهري", 
      priority: "متوسط", 
      dueDate: "2024-02-05",
      type: "report"
    },
    { 
      id: 3, 
      title: "زيارة ميدانية لمزارع الزيتون", 
      priority: "منخفض", 
      dueDate: "2024-02-10",
      type: "field"
    }
  ];

  const recentRequests = [
    { type: "إجازة اعتيادية", date: "2024-01-25", status: "معتمد", days: "5 أيام" },
    { type: "إذن خروج", date: "2024-01-20", status: "معتمد", days: "2 ساعات" },
    { type: "إجازة مرضية", date: "2024-01-15", status: "قيد المراجعة", days: "3 أيام" }
  ];

  const announcements = [
    {
      title: "تحديث نظام إدارة الموارد البشرية",
      content: "سيتم تحديث النظام يوم الجمعة القادم من الساعة 6-8 مساءً",
      date: "2024-01-28",
      type: "system"
    },
    {
      title: "ورشة تدريبية: التقنيات الحديثة في الزراعة",
      content: "مدعوون للمشاركة في ورشة التدريب يوم الثلاثاء القادم",
      date: "2024-01-27",
      type: "training"
    }
  ];

  const leaveTypes = [
    { value: "annual", label: "إجازة اعتيادية", icon: Calendar },
    { value: "sick", label: "إجازة مرضية", icon: User },
    { value: "emergency", label: "إجازة طارئة", icon: AlertCircle },
    { value: "maternity", label: "إجازة أمومة", icon: User }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-display">لوحة التحكم - Employee Dashboard</h1>
            <p className="text-muted-foreground">مرحباً {profile?.full_name || "Employee"}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Employee Info Card */}
        <Card className="bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{profile?.full_name || "Employee"}</h2>
                <p className="text-muted-foreground">{profile?.position || "Position not set"}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {profile?.department || "Department not set"}
                  </span>
                  <span>ID: {profile?.id?.slice(-8) || "N/A"}</span>
                  <span>انضم في: {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>الإجراءات السريعة</CardTitle>
              <CardDescription>العمليات الأكثر استخداماً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>طلب إجازة</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Clock className="h-6 w-6" />
                  <span>إذن خروج</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span>طلب شهادة</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                المهام المعلقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasksLoading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">{t('common.loading')}</p>
                  </div>
                ) : myTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No tasks assigned</p>
                  </div>
                ) : (
                  myTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          task.priority === "urgent" ? "destructive" : 
                          task.priority === "high" ? "destructive" :
                          task.priority === "medium" ? "default" : "secondary"
                        }>
                          {task.priority}
                        </Badge>
                        <Badge variant={
                          task.status === "completed" ? "default" :
                          task.status === "in_progress" ? "secondary" : "outline"
                        }>
                          {task.status}
                        </Badge>
                        <Button size="sm">عرض</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle>الطلبات الحديثة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{request.type}</h3>
                      <p className="text-sm text-muted-foreground">{request.date} - {request.days}</p>
                    </div>
                    <Badge variant={
                      request.status === "معتمد" ? "default" :
                      request.status === "قيد المراجعة" ? "secondary" : "destructive"
                    }>
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leave Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">رصيد الإجازات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">إجازة اعتيادية</span>
                  <span className="font-bold">18/21 يوم</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 w-[85%]"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">إجازة مرضية</span>
                  <span className="font-bold">8/14 يوم</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary rounded-full h-2 w-[57%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                الإعلانات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <Alert key={index}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <h4 className="font-medium text-sm mb-1">{announcement.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{announcement.content}</p>
                      <span className="text-xs text-muted-foreground">{announcement.date}</span>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">روابط سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  سجل الدوام
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  تقييم الأداء
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  دليل الموظفين
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Coffee className="h-4 w-4 mr-2" />
                  حجز قاعة اجتماعات
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;