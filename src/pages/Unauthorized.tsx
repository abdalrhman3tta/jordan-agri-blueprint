import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Home, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              Access Denied | الوصول مرفوض
            </CardTitle>
            <CardDescription>
              You don't have permission to access this resource
              <br />
              <span className="text-xs">ليس لديك صلاحية للوصول إلى هذا المورد</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center space-y-2">
              <p>
                This page requires specific permissions that your account doesn't have.
              </p>
              <p className="text-xs">
                تتطلب هذه الصفحة صلاحيات محددة لا يملكها حسابك.
              </p>
            </div>
            
            <div className="space-y-2">
              <Link to="/" className="block">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage | اذهب للصفحة الرئيسية
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back | العودة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;