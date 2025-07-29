
import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { campaigns, formatCurrency, formatNumber } from "@/lib/mockData";
import { CreateCampaignModal } from "@/components/modals/CreateCampaignModal";
import { useToast } from "@/hooks/use-toast";
import { useTable, SortDirection } from "@/hooks/useTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { exportCampaignsToCSV, exportCampaignsToPDF } from "@/lib/exportUtils";

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { toast } = useToast();
  const tableRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<'csv' | 'pdf' | null>(null);

  // Filtering logic for useTable
  const filterFn = useCallback(
    (campaign: typeof campaigns[0]) => {
      if (!campaign) return false;
      const search = searchTerm.trim().toLowerCase();
      const matchesName = campaign.name?.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "All" || campaign.status === statusFilter;
      // If campaign.type exists, match it too
      const matchesType = campaign.type ? campaign.type.toLowerCase().includes(search) : false;
      return (matchesName || matchesType) && matchesStatus;
    },
    [searchTerm, statusFilter]
  );

  const {
    pageData,
    page,
    pageSize,
    total,
    totalPages,
    setPage,
    sortKey,
    sortDirection,
    setSort,
    setFilterFn,
  } = useTable({
    data: campaigns,
    filterFn,
    pageSize: 8,
    initialSort: { key: "name", direction: "asc" },
  });

  // Update filterFn when search/status changes
  useEffect(() => {
    setFilterFn(filterFn);
  }, [filterFn, setFilterFn]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case 'Paused':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Paused</Badge>;
      case 'Completed':
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Completed</Badge>;
      case 'Draft':
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCTRTrend = (ctr: number) => {
    if (ctr >= 1.3) return { icon: TrendingUp, color: "text-success" };
    if (ctr <= 0.9) return { icon: TrendingDown, color: "text-destructive" };
    return { icon: TrendingUp, color: "text-muted-foreground" };
  };

  const handleCampaignAction = (action: string, campaignName: string) => {
    toast({
      title: `Campaign ${action}`,
      description: `${campaignName} has been ${action.toLowerCase()}.`,
    });
  };

  // CSV Export Handler
  const handleExportCSV = async () => {
    setExporting('csv');
    exportCampaignsToCSV(pageData, 'campaigns_report');
    setTimeout(() => {
      setExporting(null);
      toast({ title: 'CSV Exported', description: 'Campaigns CSV download started.' });
    }, 800);
  };
  // PDF Export Handler
  const handleExportPDF = async () => {
    if (!tableRef.current) return;
    setExporting('pdf');
    await exportCampaignsToPDF(tableRef.current, 'campaigns_report');
    setExporting(null);
    toast({ title: 'PDF Exported', description: 'Campaigns PDF download started.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 bg-background relative z-10">
        <div className="relative z-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Campaign Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create, monitor, and optimize your marketing campaigns.
          </p>
        </div>
        
        <CreateCampaignModal />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Campaigns</p>
                <p className="text-2xl font-bold">{campaigns.length}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">
                  {campaigns.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget, 0))}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-white opacity-95">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.spent, 0))}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '500ms' }}>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Export Buttons */}
          <div className="flex gap-2 mb-4">
            <Button onClick={handleExportCSV} disabled={!!exporting} aria-label="Export CSV">
              {exporting === 'csv' ? 'Exporting CSV...' : 'Export CSV'}
            </Button>
            <Button onClick={handleExportPDF} disabled={!!exporting} aria-label="Export PDF" variant="outline">
              {exporting === 'pdf' ? 'Exporting PDF...' : 'Export PDF'}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search campaigns"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:bg-muted/50 transition-colors">
                  <Filter className="w-4 h-4 mr-2" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["All", "Active", "Paused", "Completed", "Draft"].map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Campaign Table */}
          <div ref={tableRef} className="rounded-lg border border-border overflow-hidden bg-white dark:bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "name" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("name")}
                    className="cursor-pointer select-none"
                  >
                    Campaign Name {sortKey === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "status" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("status")}
                    className="cursor-pointer select-none"
                  >
                    Status {sortKey === "status" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "budget" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("budget")}
                    className="cursor-pointer select-none"
                  >
                    Budget {sortKey === "budget" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "spent" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("spent")}
                    className="cursor-pointer select-none"
                  >
                    Spent {sortKey === "spent" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "impressions" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("impressions")}
                    className="cursor-pointer select-none"
                  >
                    Impressions {sortKey === "impressions" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "clicks" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("clicks")}
                    className="cursor-pointer select-none"
                  >
                    Clicks {sortKey === "clicks" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "ctr" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("ctr")}
                    className="cursor-pointer select-none"
                  >
                    CTR {sortKey === "ctr" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "conversions" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("conversions")}
                    className="cursor-pointer select-none"
                  >
                    Conversions {sortKey === "conversions" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    role="columnheader button"
                    aria-sort={sortKey === "cpa" ? sortDirection : undefined}
                    tabIndex={0}
                    onClick={() => setSort("cpa")}
                    className="cursor-pointer select-none"
                  >
                    CPA {sortKey === "cpa" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(Array.isArray(pageData) && pageData.length > 0) ? pageData.map((campaign) => {
                  if (!campaign) return null;
                  const TrendIcon = getCTRTrend(campaign.ctr).icon;
                  const trendColor = getCTRTrend(campaign.ctr).color;
                  
                  return (
                    <TableRow key={campaign.id || campaign.name} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-semibold">{campaign.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                      <TableCell>
                        <div>
                          <p>{formatCurrency(campaign.spent)}</p>
                          <p className="text-xs text-muted-foreground">
                            {((campaign.spent / campaign.budget) * 100).toFixed(1)}% used
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber(campaign.impressions)}</TableCell>
                      <TableCell>{formatNumber(campaign.clicks)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendIcon className={`w-3 h-3 ${trendColor}`} />
                          <span>{campaign.ctr}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.conversions}</TableCell>
                      <TableCell>{formatCurrency(campaign.cpa)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleCampaignAction('Edit', campaign.name)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCampaignAction(campaign.status === 'Active' ? 'Pause' : 'Start', campaign.name)}>
                              {campaign.status === 'Active' ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Start
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleCampaignAction('Delete', campaign.name)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                }) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination Controls */}
          <div className="mt-4 flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setPage(Math.max(1, page - 1));
                    }}
                    aria-disabled={page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      onClick={e => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setPage(Math.min(totalPages, page + 1));
                    }}
                    aria-disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
