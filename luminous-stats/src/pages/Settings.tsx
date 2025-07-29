import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  CreditCard,
  Save,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [performanceAlerts, setPerformanceAlerts] = useState(true);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Appearance changed to ${newTheme} mode.`,
    });
  };

  const settingSections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your account information"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure your notification preferences"
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize the look and feel"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Manage security and privacy settings"
    },
    {
      icon: Globe,
      title: "Regional",
      description: "Language and timezone preferences"
    },
    {
      icon: CreditCard,
      title: "Billing",
      description: "Subscription and payment settings"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 bg-background relative z-10">
        <div className="relative z-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and application settings.
          </p>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          onClick={handleSaveChanges}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Quick Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 text-center">
                <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm">{section.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-xl font-bold text-white">AD</span>
              </div>
              <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="User" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@admybrand.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="ADmyBRAND" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get push notifications in your browser
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly performance summaries
                </p>
              </div>
              <Switch
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Performance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get alerts for significant changes
                </p>
              </div>
              <Switch
                checked={performanceAlerts}
                onCheckedChange={setPerformanceAlerts}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appearance Settings */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '800ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance & Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-base">Theme Preference</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how the dashboard should appear
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'system', label: 'System', icon: Monitor }
                ].map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <Card 
                      key={themeOption.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-hover ${
                        theme === themeOption.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleThemeChange(themeOption.id as 'light' | 'dark' | 'system')}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium">{themeOption.label}</p>
                        {theme === themeOption.id && (
                          <Badge className="mt-2 bg-primary/10 text-primary">Active</Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base">Password</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Last changed 3 months ago
                </p>
                <Button variant="outline" onClick={() => toast({ title: "Password Change", description: "Password change form would open here." })}>
                  Change Password
                </Button>
              </div>
              
              <div>
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add an extra layer of security
                </p>
                <Button variant="outline" onClick={() => toast({ title: "2FA Setup", description: "Two-factor authentication setup would begin here." })}>
                  Enable 2FA
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base">Active Sessions</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Manage your active sessions
                </p>
                <Button variant="outline" onClick={() => toast({ title: "Sessions", description: "Active sessions management would open here." })}>
                  View Sessions
                </Button>
              </div>
              
              <div>
                <Label className="text-base">Data Export</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Download your data
                </p>
                <Button variant="outline" onClick={() => toast({ title: "Data Export", description: "Your data export is being prepared." })}>
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
