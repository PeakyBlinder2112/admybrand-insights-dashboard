
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  BarChart3, 
  Target, 
  FileText, 
  Settings, 
  Download,
  Mail,
  MessageCircle,
  BookOpen,
  TrendingUp
} from "lucide-react";

export default function Help() {
  const sections = [
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "Get an overview of your key metrics including revenue, users, conversions, and growth rates."
    },
    {
      icon: Target,
      title: "Campaigns",
      description: "Manage your advertising campaigns, monitor performance, and optimize spending."
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Deep dive into user behavior, conversion funnels, and advanced performance insights."
    },
    {
      icon: FileText,
      title: "Reports",
      description: "Generate and download comprehensive reports for stakeholders and analysis."
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Customize your profile, notification preferences, and application settings."
    }
  ];

  const metrics = [
    {
      term: "CTR (Click-Through Rate)",
      definition: "The percentage of people who click on your ad after seeing it. Higher CTR indicates more engaging content.",
      formula: "CTR = (Clicks ÷ Impressions) × 100"
    },
    {
      term: "ROI (Return on Investment)",
      definition: "Measures the efficiency of your advertising spend. Shows how much revenue you generate per dollar spent.",
      formula: "ROI = (Revenue - Cost) ÷ Cost × 100"
    },
    {
      term: "CPA (Cost Per Acquisition)",
      definition: "The average cost to acquire one customer or conversion. Lower CPA means more efficient campaigns.",
      formula: "CPA = Total Campaign Cost ÷ Number of Conversions"
    },
    {
      term: "Bounce Rate",
      definition: "The percentage of visitors who leave your site after viewing only one page. Lower is generally better.",
      formula: "Bounce Rate = Single Page Sessions ÷ Total Sessions × 100"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
          Welcome to ADmyBRAND Insights
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive analytics dashboard for tracking campaign performance, 
          understanding user behavior, and optimizing your marketing strategies.
        </p>
      </div>

      {/* Navigation Guide */}
      <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Platform Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Guide */}
      <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Understanding Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={metric.term} className="border-l-4 border-primary pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{metric.term}</h3>
                    <Badge variant="outline" className="text-xs">Metric</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{metric.definition}</p>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <code className="text-sm font-mono">{metric.formula}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Exporting Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate comprehensive reports for stakeholders and analysis:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Click "Export Report" on any dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Choose date range and metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Download in PDF or CSV format
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Customizing Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Personalize your dashboard experience:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Switch between light and dark themes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Configure notification preferences
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Set up weekly report summaries
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support Section */}
      <div className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Need Additional Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-lg bg-muted/20">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get help from our support team
                </p>
                <Button variant="outline" className="w-full">
                  support@admybrand.com
                </Button>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-muted/20">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our team in real-time
                </p>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Start Chat
                </Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-center">
                <strong>Response Time:</strong> We typically respond within 24 hours during business days.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
