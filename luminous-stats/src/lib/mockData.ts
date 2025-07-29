// Mock data for ADmyBRAND Insights Dashboard

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  startDate: string;
  endDate: string;
}

export interface MetricData {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
}

export interface ChartData {
  name: string;
  value?: number;
  date?: string;
  impressions?: number;
  clicks?: number;
  conversions?: number;
}

// Metrics for dashboard cards
export const metrics: MetricData[] = [
  {
    label: 'Total Revenue',
    value: '₹1.2L',
    change: 12.50,
    trend: 'up',
    icon: 'TrendingUp',
    color: 'primary'
  },
  {
    label: 'Active Users',
    value: '25,658',
    change: 8.20,
    trend: 'up',
    icon: 'Users',
    color: 'secondary'
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: -2.10,
    trend: 'down',
    icon: 'Target',
    color: 'warning'
  },
  {
    label: 'Growth Rate',
    value: '↑12.30%',
    change: 15.30,
    trend: 'up',
    icon: 'BarChart3',
    color: 'success'
  }
];

// Campaign data
export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Fashion Collection',
    status: 'Active',
    budget: 50000,
    spent: 35750,
    impressions: 1250000,
    clicks: 15600,
    ctr: 1.25,
    conversions: 485,
    cpa: 73.71,
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: '2',
    name: 'Tech Product Launch',
    status: 'Active',
    budget: 75000,
    spent: 45200,
    impressions: 890000,
    clicks: 12100,
    ctr: 1.36,
    conversions: 325,
    cpa: 139.08,
    startDate: '2024-07-15',
    endDate: '2024-09-15'
  },
  {
    id: '3',
    name: 'Holiday Special Offers',
    status: 'Paused',
    budget: 30000,
    spent: 28900,
    impressions: 750000,
    clicks: 9500,
    ctr: 1.27,
    conversions: 285,
    cpa: 101.40,
    startDate: '2024-05-01',
    endDate: '2024-07-31'
  },
  {
    id: '4',
    name: 'Brand Awareness Campaign',
    status: 'Completed',
    budget: 40000,
    spent: 39800,
    impressions: 2100000,
    clicks: 18900,
    ctr: 0.90,
    conversions: 156,
    cpa: 255.13,
    startDate: '2024-04-01',
    endDate: '2024-06-30'
  },
  {
    id: '5',
    name: 'Mobile App Promotion',
    status: 'Draft',
    budget: 60000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    conversions: 0,
    cpa: 0,
    startDate: '2024-08-01',
    endDate: '2024-10-31'
  }
];

// Revenue chart data (last 12 months)
export const revenueData: ChartData[] = [
  { name: 'Jan', value: 850000, date: '2024-01' },
  { name: 'Feb', value: 920000, date: '2024-02' },
  { name: 'Mar', value: 1100000, date: '2024-03' },
  { name: 'Apr', value: 980000, date: '2024-04' },
  { name: 'May', value: 1150000, date: '2024-05' },
  { name: 'Jun', value: 1320000, date: '2024-06' },
  { name: 'Jul', value: 1250000, date: '2024-07' },
  { name: 'Aug', value: 1400000, date: '2024-08' },
  { name: 'Sep', value: 1280000, date: '2024-09' },
  { name: 'Oct', value: 1450000, date: '2024-10' },
  { name: 'Nov', value: 1380000, date: '2024-11' },
  { name: 'Dec', value: 1500000, date: '2024-12' }
];

// Campaign impressions data
export const impressionsData: ChartData[] = [
  { name: 'Summer Fashion', impressions: 1250000, clicks: 15600, conversions: 485 },
  { name: 'Tech Launch', impressions: 890000, clicks: 12100, conversions: 325 },
  { name: 'Holiday Offers', impressions: 750000, clicks: 9500, conversions: 285 },
  { name: 'Brand Awareness', impressions: 2100000, clicks: 18900, conversions: 156 },
  { name: 'Mobile App', impressions: 0, clicks: 0, conversions: 0 }
];

// Traffic sources data
export const trafficSources: ChartData[] = [
  { name: 'Google Ads', value: 45 },
  { name: 'Facebook', value: 25 },
  { name: 'Instagram', value: 15 },
  { name: 'LinkedIn', value: 10 },
  { name: 'Others', value: 5 }
];

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

// Utility function to format numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};