import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Globe, Package, CheckCircle, ArrowRight, Mail, Lock, User, Building } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AuthLandingProps {
  onAuthenticate: (user: { email: string; role: 'donor' | 'admin'; name: string }) => void;
}

const AuthLanding = ({ onAuthenticate }: AuthLandingProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'donor' as 'donor' | 'admin'
  });

  // Dummy data for authentication
  const dummyUsers = {
    'donor@example.com': { email: 'donor@example.com', role: 'donor' as const, name: 'John Donor', password: 'donor123' },
    'admin@akhuwat.org': { email: 'admin@akhuwat.org', role: 'admin' as const, name: 'Admin User', password: 'admin123' }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'login') {
      const user = dummyUsers[formData.email as keyof typeof dummyUsers];
      if (user && user.password === formData.password) {
        onAuthenticate(user);
      } else {
        alert('Invalid credentials. Try: donor@example.com / donor123 or admin@akhuwat.org / admin123');
      }
    } else {
      // Signup - create new user with form data
      onAuthenticate({
        email: formData.email,
        role: formData.role,
        name: formData.name
      });
    }
  };

  const stats = [
    { icon: Package, label: "Containers Shipped", value: "2,847", description: "To families in Pakistan" },
    { icon: Users, label: "Active Donors", value: "15,392", description: "Across the USA" },
    { icon: Heart, label: "Lives Impacted", value: "68,000+", description: "Families helped" },
    { icon: Globe, label: "Drop-off Centers", value: "127", description: "Nationwide network" }
  ];

  const features = [
    { icon: CheckCircle, title: "Tax Deductible", description: "Automatic receipts for all donations" },
    { icon: Package, title: "Free Pickup", description: "UPS pickup service available" },
    { icon: Shield, title: "Trusted 501(c)(3)", description: "Registered nonprofit organization" },
    { icon: Globe, title: "Global Impact", description: "Direct aid to Pakistan families" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Akhuwat USA
                </h1>
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform your unused clothes into hope for families in Pakistan. 
                Join thousands of Americans making a difference across the globe.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <Badge variant="secondary" className="text-sm px-4 py-2">Tax Deductible</Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">Free Pickup Available</Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">501(c)(3) Nonprofit</Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Stats & Features */}
              <div className="space-y-8">
                {/* Impact Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-sm font-medium text-primary">{stat.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                      <feature.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground text-sm">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Demo Credentials */}
                <Card className="border-accent/20 bg-accent/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Demo Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="p-3 rounded bg-background/50">
                      <div className="font-medium">Donor Account:</div>
                      <div className="text-muted-foreground">Email: donor@example.com</div>
                      <div className="text-muted-foreground">Password: donor123</div>
                    </div>
                    <div className="p-3 rounded bg-background/50">
                      <div className="font-medium">Admin Account:</div>
                      <div className="text-muted-foreground">Email: admin@akhuwat.org</div>
                      <div className="text-muted-foreground">Password: admin123</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Auth Form */}
              <div className="flex justify-center">
                <Card className="w-full max-w-md shadow-glow border-accent/20">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">Join Our Mission</CardTitle>
                    <CardDescription className="text-base">
                      Start making a difference today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="login" className="space-y-4 mt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="login-email" className="text-sm font-medium">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="login-email"
                                type="email"
                                placeholder="your@email.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="login-password" className="text-sm font-medium">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="login-password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={formData.password}
                                onChange={(e) => updateFormData('password', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <Button type="submit" className="w-full" size="lg">
                            Sign In & Start Helping
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="signup" className="space-y-4 mt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="signup-name" className="text-sm font-medium">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="signup-name"
                                placeholder="John Doe"
                                className="pl-10"
                                value={formData.name}
                                onChange={(e) => updateFormData('name', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="signup-email"
                                type="email"
                                placeholder="your@email.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="signup-password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={formData.password}
                                onChange={(e) => updateFormData('password', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium">Account Type</label>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                type="button"
                                variant={formData.role === 'donor' ? 'default' : 'outline'}
                                className={cn("justify-start", formData.role === 'donor' && "shadow-glow")}
                                onClick={() => updateFormData('role', 'donor')}
                              >
                                <Heart className="w-4 h-4 mr-2" />
                                Donor
                              </Button>
                              <Button
                                type="button"
                                variant={formData.role === 'admin' ? 'default' : 'outline'}
                                className={cn("justify-start", formData.role === 'admin' && "shadow-glow")}
                                onClick={() => updateFormData('role', 'admin')}
                              >
                                <Building className="w-4 h-4 mr-2" />
                                Admin
                              </Button>
                            </div>
                          </div>
                          <Button type="submit" className="w-full" size="lg">
                            Create Account & Join Mission
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Footer */}
      <div className="border-t border-accent/20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>501(c)(3) Verified</span>
              </div>
            </div>
            <div>
              <span>© 2025 Akhuwat USA. Tax ID: 123-45-6789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;