
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Globe, 
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  Users,
  Target,
  Download,
  Calendar
} from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { BarChart } from "@/components/charts/BarChart";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Analytics() {
  const { toast } = useToast();
  const [dateLoading, setDateLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Mock data for advanced analytics
  const funnelData = [
    { name: 'Ad Views', value: 125000, percentage: 100 },
    { name: 'Clicks', value: 15600, percentage: 12.5 },
    { name: 'Conversions', value: 1248, percentage: 8.0 },
    { name: 'Purchases', value: 624, percentage: 4.0 }
  ];

  const userActivityData = [
    { name: '00:00', value: 145 },
    { name: '03:00', value: 89 },
    { name: '06:00', value: 234 },
    { name: '09:00', value: 1456 },
    { name: '12:00', value: 2345 },
    { name: '15:00', value: 1890 },
    { name: '18:00', value: 2456 },
    { name: '21:00', value: 1234 }
  ];

  const deviceData = [
    { name: 'Mobile', value: 68, icon: Smartphone },
    { name: 'Desktop', value: 24, icon: Monitor },
    { name: 'Tablet', value: 8, icon: Tablet }
  ];

  const geoData = [
    { name: 'Mumbai', value: 34, users: 8500 },
    { name: 'Delhi', value: 28, users: 7000 },
    { name: 'Bangalore', value: 18, users: 4500 },
    { name: 'Chennai', value: 12, users: 3000 },
    { name: 'Others', value: 8, users: 2000 }
  ];

  const campaignMatrix = [
    { name: 'Summer Fashion', reach: 125000, ctr: 1.25, roi: 3.2, effectiveness: 85 },
    { name: 'Tech Launch', reach: 89000, ctr: 1.36, roi: 2.8, effectiveness: 78 },
    { name: 'Holiday Offers', reach: 75000, ctr: 1.27, roi: 4.1, effectiveness: 92 },
    { name: 'Brand Awareness', reach: 210000, ctr: 0.90, roi: 1.5, effectiveness: 65 }
  ];

  const handleExportAnalytics = () => {
    toast({
      title: "Advanced Analytics Export",
      description: "Your detailed analytics report is being prepared.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 bg-background relative z-10">
        <div className="relative z-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Advanced Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Deep insights and performance analysis for your campaigns.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-primary/5 transition-all duration-200"
                  disabled={dateLoading}
                  onClick={() => {
                    setDateLoading(true);
                    toast({ title: "Loading Date Range…", description: "Fetching available date ranges." });
                    setTimeout(() => {
                      setDateLoading(false);
                      toast({ title: "Date Range Ready", description: "Date range selection is now available." });
                    }, 1200);
                  }}
                >
                  {dateLoading ? (
                    <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Loading…</span>
                  ) : (
                    <><Calendar className="w-4 h-4 mr-2" />Date Range</>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Select a custom date range for analytics</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                  disabled={exportLoading}
                  onClick={() => {
                    setExportLoading(true);
                    toast({ title: "Exporting Data…", description: "Your analytics data is being exported." });
                    setTimeout(() => {
                      setExportLoading(false);
                      toast({ title: "Export Complete", description: "Analytics data export is ready." });
                    }, 1500);
                  }}
                >
                  {exportLoading ? (
                    <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Exporting…</span>
                  ) : (
                    <><Download className="w-4 h-4 mr-2" />Export Data</>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export analytics data as CSV or PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Conversion Funnel Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={stage.name} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{stage.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{stage.value.toLocaleString()}</span>
                      <Badge variant="secondary">{stage.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(stage.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity & Device Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                User Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={userActivityData}
                title=""
                dataKey="value"
                color="#10b981"
                gradient={false}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                data={deviceData}
                title=""
                dataKey="value"
              />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/20">
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-medium">68%</p>
                  <p className="text-xs text-muted-foreground">Mobile</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <Monitor className="w-5 h-5 mx-auto mb-1 text-secondary" />
                  <p className="text-sm font-medium">24%</p>
                  <p className="text-xs text-muted-foreground">Desktop</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <Tablet className="w-5 h-5 mx-auto mb-1 text-warning" />
                  <p className="text-sm font-medium">8%</p>
                  <p className="text-xs text-muted-foreground">Tablet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Geographic User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {geoData.map((location, index) => (
                  <div key={location.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">{location.users.toLocaleString()} users</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{location.value}%</Badge>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center p-8 bg-muted/10 rounded-lg">
                <div className="text-center">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
                  <p className="text-sm text-muted-foreground">Interactive map visualization</p>
                  <p className="text-xs text-muted-foreground mt-1">Available in premium version</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Effectiveness Matrix */}
      <div className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Campaign Effectiveness Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Campaign</th>
                    <th className="text-right p-3 font-medium">Reach</th>
                    <th className="text-right p-3 font-medium">CTR</th>
                    <th className="text-right p-3 font-medium">ROI</th>
                    <th className="text-right p-3 font-medium">Effectiveness</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignMatrix.map((campaign, index) => (
                    <tr key={campaign.name} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-medium">{campaign.name}</td>
                      <td className="p-3 text-right">{campaign.reach.toLocaleString()}</td>
                      <td className="p-3 text-right">{campaign.ctr}%</td>
                      <td className="p-3 text-right">{campaign.roi}x</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 bg-muted/30 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-success to-primary h-2 rounded-full"
                              style={{ width: `${campaign.effectiveness}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{campaign.effectiveness}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
