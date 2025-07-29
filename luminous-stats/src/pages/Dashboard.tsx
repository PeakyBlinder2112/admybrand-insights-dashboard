
import { MetricCard } from "@/components/cards/MetricCard";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { 
  metrics as initialMetrics,
  revenueData, 
  trafficSources
} from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  ExternalLink 
} from "lucide-react";
import { useLiveData } from "@/hooks/useLiveData";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const metrics = useLiveData(initialMetrics);
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report Export Started",
      description: "Your dashboard report is being prepared for download.",
    });
    
    // Simulate file download
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Dashboard_Report_2024.pdf has been downloaded.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 bg-background relative z-10">
        <div className="relative z-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-2 relative z-10">
            Real-time performance insights and key business metrics.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-20">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Live Data
          </Badge>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105"
            onClick={handleExportReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <MetricCard
              {...metric}
              delay={index * 150}
            />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        <div className="xl:col-span-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <LineChart
            data={revenueData}
            title="Monthly Revenue Trend"
            dataKey="value"
            color="#6366f1"
            gradient={true}
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <PieChart
            data={trafficSources}
            title="Traffic Sources"
            dataKey="value"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '1000ms' }}>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-primary/5 transition-all duration-200"
                onClick={() => toast({ title: "Navigating to Campaigns", description: "Loading campaign management..." })}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Manage Campaigns</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-primary/5 transition-all duration-200"
                onClick={() => toast({ title: "Navigating to Reports", description: "Loading detailed reports..." })}
              >
                <Download className="w-5 h-5" />
                <span>View Reports</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-primary/5 transition-all duration-200"
                onClick={() => toast({ title: "Navigating to Analytics", description: "Loading advanced analytics..." })}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Deep Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
