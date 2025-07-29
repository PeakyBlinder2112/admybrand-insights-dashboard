
import { Search, Bell, Menu, Sun, Moon, Monitor, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuClick: () => void;
  collapsed: boolean;
}

export function TopBar({ onMenuClick, collapsed }: TopBarProps) {
  const { theme, setTheme, currentTheme } = useTheme();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}`,
    });
  };

  const notifications = [
    {
      id: 1,
      title: "Campaign Performance Alert",
      message: "Summer Fashion campaign CTR increased by 15%",
      type: "success",
      time: "2 minutes ago"
    },
    {
      id: 2,
      title: "Budget Warning",
      message: "Tech Launch campaign has spent 80% of budget",
      type: "warning",
      time: "1 hour ago"
    },
    {
      id: 3,
      title: "Goal Achieved",
      message: "Monthly revenue target reached!",
      type: "success",
      time: "3 hours ago"
    }
  ];

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, reports..."
            className="pl-10 w-64 lg:w-80 bg-background/50 border-border/50 focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Quick Stats */}
        <div className="hidden lg:flex items-center gap-4 mr-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm text-muted-foreground">5 Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">₹12.5L Today</span>
          </div>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {notifications.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-sm border-border/50">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">You have {notifications.length} new notifications</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 w-full">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      notification.type === 'success' ? 'bg-success' : 
                      notification.type === 'warning' ? 'bg-warning' : 'bg-primary'
                    )} />
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 ml-4">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 ml-4">
                    {notification.time}
                  </p>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              {currentTheme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-border/50">
            <DropdownMenuItem onClick={() => handleThemeChange('light')} className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Light
              {theme === 'light' && <Badge variant="secondary" className="ml-auto">Active</Badge>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Dark
              {theme === 'dark' && <Badge variant="secondary" className="ml-auto">Active</Badge>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange('system')} className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              System
              {theme === 'system' && <Badge variant="secondary" className="ml-auto">Active</Badge>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full p-0">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-sm font-medium text-white">AD</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-sm border-border/50 max-h-80 overflow-y-auto" align="end">
            <div className="flex items-center gap-2 p-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-medium text-white">AD</span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@admybrand.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="w-4 h-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
