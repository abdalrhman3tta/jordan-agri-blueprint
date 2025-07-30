import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, FileText, MapPin, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "@/components/ui/file-upload";
import { useApplications } from "@/hooks/useApplications";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const NewApplication = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { createApplication } = useApplications();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicationType: "",
    personalInfo: {
      fullName: "",
      nationalId: "",
      phone: "",
      email: "",
      address: ""
    },
    projectDetails: {
      projectType: "",
      location: "",
      area: "",
      description: "",
      estimatedCost: ""
    },
    documents: {
      nationalIdCopy: null,
      landOwnership: null,
      projectPlan: null,
      financialStatement: null
    }
  });

  const steps = [
    { id: "type", title: "نوع الطلب", icon: FileText },
    { id: "personal", title: "المعلومات الشخصية", icon: FileText },
    { id: "project", title: "تفاصيل المشروع", icon: MapPin },
    { id: "documents", title: "المستندات", icon: Upload },
    { id: "review", title: "المراجعة", icon: FileText }
  ];

  const applicationTypes = [
    { value: "well-permit", label: "تصريح حفر بئر - Well Drilling Permit", description: "للحصول على إذن لحفر بئر مياه جوفية" },
    { value: "loan", label: "قرض زراعي - Agricultural Loan", description: "طلب قرض لتمويل المشاريع الزراعية" },
    { value: "subsidy", label: "دعم زراعي - Agricultural Subsidy", description: "طلب دعم مالي للمنتجات الزراعية" },
    { value: "license", label: "رخصة زراعية - Agricultural License", description: "رخصة لممارسة النشاط الزراعي" }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!profile || !formData.applicationType) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await createApplication({
        application_type: formData.applicationType as any,
        title: applicationTypes.find(type => type.value === formData.applicationType)?.label || formData.applicationType,
        description: formData.projectDetails.description,
        priority: 'medium',
        metadata: {
          personalInfo: formData.personalInfo,
          projectDetails: formData.projectDetails,
          documents: formData.documents
        }
      });

      if (result.error) {
        toast.error("Failed to submit application");
        return;
      }

      toast.success("Application submitted successfully!");
      navigate("/farmer");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={() => navigate("/farmer")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للوحة التحكم
          </Button>
        </div>
        <h1 className="text-display mb-2">طلب جديد - New Application</h1>
        <p className="text-muted-foreground">Complete all steps to submit your application</p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{currentStep + 1} of {steps.length}</span>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Steps */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 0: Application Type */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-heading-1 mb-4">اختر نوع الطلب</h2>
                <div className="grid gap-4">
                  {applicationTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.applicationType === type.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-input hover:bg-accent'
                      }`}
                      onClick={() => setFormData({ ...formData, applicationType: type.value })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{type.label}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </div>
                        {formData.applicationType === type.value && (
                          <Badge variant="default">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-heading-1 mb-4">المعلومات الشخصية</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    placeholder="Full Name"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">الرقم الوطني</Label>
                    <Input
                      id="nationalId"
                      placeholder="National ID"
                      value={formData.personalInfo.nationalId}
                      onChange={(e) => setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, nationalId: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      placeholder="Phone Number"
                      value={formData.personalInfo.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value }
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea
                    id="address"
                    placeholder="Full Address"
                    value={formData.personalInfo.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, address: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-heading-1 mb-4">تفاصيل المشروع</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType">نوع المشروع</Label>
                  <Select 
                    value={formData.projectDetails.projectType}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      projectDetails: { ...formData.projectDetails, projectType: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">خضروات - Vegetables</SelectItem>
                      <SelectItem value="fruits">فواكه - Fruits</SelectItem>
                      <SelectItem value="grains">حبوب - Grains</SelectItem>
                      <SelectItem value="livestock">ثروة حيوانية - Livestock</SelectItem>
                      <SelectItem value="greenhouse">بيوت محمية - Greenhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    <Input
                      id="location"
                      placeholder="Project Location"
                      value={formData.projectDetails.location}
                      onChange={(e) => setFormData({
                        ...formData,
                        projectDetails: { ...formData.projectDetails, location: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">المساحة (دونم)</Label>
                    <Input
                      id="area"
                      placeholder="Area in Dunum"
                      value={formData.projectDetails.area}
                      onChange={(e) => setFormData({
                        ...formData,
                        projectDetails: { ...formData.projectDetails, area: e.target.value }
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">التكلفة المتوقعة (دينار)</Label>
                  <Input
                    id="estimatedCost"
                    placeholder="Estimated Cost in JOD"
                    value={formData.projectDetails.estimatedCost}
                    onChange={(e) => setFormData({
                      ...formData,
                      projectDetails: { ...formData.projectDetails, estimatedCost: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">وصف المشروع</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed project description"
                    value={formData.projectDetails.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      projectDetails: { ...formData.projectDetails, description: e.target.value }
                    })}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-heading-1 mb-4">المستندات المطلوبة</h2>
              <div className="grid gap-4">
                {[
                  { key: "nationalIdCopy", label: "نسخة من الهوية - National ID Copy", required: true },
                  { key: "landOwnership", label: "وثيقة ملكية الأرض - Land Ownership Document", required: true },
                  { key: "projectPlan", label: "مخطط المشروع - Project Plan", required: false },
                  { key: "financialStatement", label: "البيان المالي - Financial Statement", required: true }
                  ].map((doc) => (
                    <div key={doc.key}>
                      <FileUpload
                        label={doc.label}
                        required={doc.required}
                        bucket="documents"
                        folder="applications"
                        accept={{
                          'application/pdf': ['.pdf'],
                          'image/*': ['.jpg', '.jpeg', '.png'],
                          'application/msword': ['.doc'],
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                        }}
                        onUploadComplete={(files) => {
                          setFormData({
                            ...formData,
                            documents: {
                              ...formData.documents,
                              [doc.key]: files[0]
                            }
                          });
                        }}
                        onUploadError={(error) => {
                          toast.error("Failed to upload file");
                          console.error("Upload error:", error);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-heading-1 mb-4">مراجعة الطلب</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>نوع الطلب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{applicationTypes.find(type => type.value === formData.applicationType)?.label}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الشخصية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>الاسم:</strong> {formData.personalInfo.fullName}</p>
                    <p><strong>الرقم الوطني:</strong> {formData.personalInfo.nationalId}</p>
                    <p><strong>الهاتف:</strong> {formData.personalInfo.phone}</p>
                    <p><strong>البريد الإلكتروني:</strong> {formData.personalInfo.email}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل المشروع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>نوع المشروع:</strong> {formData.projectDetails.projectType}</p>
                    <p><strong>الموقع:</strong> {formData.projectDetails.location}</p>
                    <p><strong>المساحة:</strong> {formData.projectDetails.area} دونم</p>
                    <p><strong>التكلفة المتوقعة:</strong> {formData.projectDetails.estimatedCost} دينار</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              السابق
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "تقديم الطلب - Submit Application"}
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={currentStep === 0 && !formData.applicationType}
              >
                التالي
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewApplication;