import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import ministryLogo from "@/assets/ministry-logo.png";
import { useAuth } from "@/hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (!error) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                Check Your Email | تحقق من بريدك الإلكتروني
              </CardTitle>
              <CardDescription>
                We've sent a password reset link to {email}
                <br />
                <span className="text-xs">لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground text-center space-y-2">
                <p>
                  If you don't see the email, check your spam folder or try again with a different email address.
                </p>
                <p className="text-xs">
                  إذا لم تجد البريد الإلكتروني، تحقق من مجلد الرسائل المرفوضة أو حاول مرة أخرى بعنوان بريد إلكتروني مختلف.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                >
                  Try Different Email | جرب بريد إلكتروني آخر
                </Button>
                
                <Link to="/auth/login" className="block">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login | العودة لتسجيل الدخول
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link 
          to="/auth/login" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login | العودة لتسجيل الدخول
        </Link>

        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={ministryLogo} 
                alt="Ministry Logo" 
                className="h-16 w-16"
              />
            </div>
            <CardTitle className="text-2xl">
              Reset Password | إعادة تعيين كلمة المرور
            </CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
              <br />
              <span className="text-xs">أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email | البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              {/* Reset Button */}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  "Send Reset Link | إرسال رابط الإعادة"
                )}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Remember your password? | تذكرت كلمة المرور؟
                </span>
                <br />
                <Link to="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in here | سجل دخولك هنا
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;