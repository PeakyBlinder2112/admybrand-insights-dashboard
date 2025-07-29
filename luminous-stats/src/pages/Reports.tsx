import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar, 
  FileText, 
  BarChart3,
  TrendingUp,
  Users,
  Target,
  DollarSign 
} from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { revenueData, impressionsData, formatCurrency } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Reports() {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const reportTypes = [
    {
      title: "Performance Report",
      description: "Comprehensive campaign performance metrics",
      icon: BarChart3,
      type: "performance",
      lastGenerated: "2 hours ago",
      status: "Ready"
    },
    {
      title: "Revenue Analysis",
      description: "Monthly revenue trends and projections",
      icon: DollarSign,
      type: "revenue",
      lastGenerated: "1 day ago", 
      status: "Ready"
    },
    {
      title: "Audience Insights",
      description: "User demographics and behavior patterns",
      icon: Users,
      type: "audience",
      lastGenerated: "3 days ago",
      status: "Generating"
    },
    {
      title: "Conversion Report",
      description: "Conversion funnel analysis and optimization",
      icon: Target,
      type: "conversion",
      lastGenerated: "5 days ago",
      status: "Ready"
    }
  ];

  const quickStats = [
    { label: "Total Reports", value: "24", icon: FileText },
    { label: "This Month", value: "8", icon: Calendar },
    { label: "Automated", value: "12", icon: TrendingUp },
    { label: "Custom", value: "4", icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 bg-background relative z-10">
        <div className="relative z-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate detailed reports and insights for your campaigns.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-20">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={generating}
            onClick={() => {
              setGenerating(true);
              toast({ title: "Report generating…", description: "Your report is being prepared." });
              setTimeout(() => {
                setGenerating(false);
                toast({ title: "Report ready!", description: "Your report is ready for download." });
              }, 1800);
            }}
          >
            {generating ? (
              <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Generating…</span>
            ) : (
              <><Download className="w-4 h-4 mr-2" />Generate Report</>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Types */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.type} className="border border-border/50 hover:shadow-hover transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge 
                        variant={report.status === 'Ready' ? 'default' : 'secondary'}
                        className={
                          report.status === 'Ready' 
                            ? 'bg-success/10 text-success border-success/20' 
                            : 'bg-warning/10 text-warning border-warning/20'
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Last generated: {report.lastGenerated}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => {
                        toast({
                          title: 'Download Started',
                          description: `${report.title} is being prepared for download.`
                        });
                        setTimeout(() => {
                          toast({
                            title: 'Download Ready',
                            description: `${report.title} report has been downloaded.`
                          });
                        }, 1200);
                      }}>
                        <Download className="w-3 h-3 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Visual Reports */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LineChart
          data={revenueData}
          title="Revenue Trend Analysis"
          dataKey="value"
          color="#6366f1"
          gradient={true}
        />
        
        <BarChart
          data={impressionsData.slice(0, 4)}
          title="Campaign Performance Comparison"
          dataKey="impressions"
        />
      </div>

      {/* Top Performing Campaigns */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Performing Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Campaign Name</th>
                  <th className="text-center p-3 font-medium">Platform</th>
                  <th className="text-right p-3 font-medium">Revenue</th>
                  <th className="text-right p-3 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">Festive Offers</td>
                  <td className="p-3 text-center">
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Google Ads</Badge>
                  </td>
                  <td className="p-3 text-right font-bold">₹52.3K</td>
                  <td className="p-3 text-right">
                    <span className="text-success font-medium">+12%</span>
                  </td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">Brand Awareness Q4</td>
                  <td className="p-3 text-center">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Facebook</Badge>
                  </td>
                  <td className="p-3 text-right font-bold">₹42.8K</td>
                  <td className="p-3 text-right">
                    <span className="text-success font-medium">+15%</span>
                  </td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">New Collection</td>
                  <td className="p-3 text-center">
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Google Ads</Badge>
                  </td>
                  <td className="p-3 text-right font-bold">₹41.5K</td>
                  <td className="p-3 text-right">
                    <span className="text-success font-medium">+18%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Optimization Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Your Facebook campaigns show 23% better performance on weekends. 
                  Consider increasing weekend budgets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-success/20 bg-gradient-to-br from-success/5 to-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-success">Growth Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Mobile traffic increased 31% this month. 
                  Consider using mobile-optimized ad creatives.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Revenue Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Total Revenue</span>
                  <span className="font-bold">{formatCurrency(15800000)}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Monthly Growth</span>
                  <span className="font-bold text-success">+12.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Average Order Value</span>
                  <span className="font-bold">{formatCurrency(2450)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Traffic Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Total Impressions</span>
                  <span className="font-bold">4.89M</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Click-through Rate</span>
                  <span className="font-bold text-secondary">1.17%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Cost per Click</span>
                  <span className="font-bold">{formatCurrency(125)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Conversion Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Total Conversions</span>
                  <span className="font-bold">1,251</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Conversion Rate</span>
                  <span className="font-bold text-warning">3.24%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Cost per Acquisition</span>
                  <span className="font-bold">{formatCurrency(142)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}