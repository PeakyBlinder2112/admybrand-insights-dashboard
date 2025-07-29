import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  FileText, 
  BarChart3, 
  Settings,
  ChevronLeft,
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  X,
  Edit,
  Phone,
  MapPin,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  {
    href: "/",
    title: "Dashboard",
    description: "Overview & Analytics",
    icon: TrendingUp,
  },
  {
    href: "/campaigns",
    title: "Campaigns",
    description: "Campaign Management",
    icon: Target,
  },
  {
    href: "/reports",
    title: "Reports",
    description: "Detailed Reports",
    icon: FileText,
  },
  {
    href: "/analytics",
    title: "Analytics",
    description: "Deep Insights",
    icon: BarChart3,
  },
  {
    href: "/settings",
    title: "Settings",
    description: "App Configuration",
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "relative h-screen bg-sidebar transition-all duration-300 ease-in-out transition-colors flex flex-col",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo & Brand */}
        <div className={cn(
          "flex items-center transition-all duration-300 ease-in-out",
          collapsed ? "justify-center px-0 pt-4 pb-2" : "gap-3 pl-2 pr-2 pt-4 pb-2 justify-start"
        )}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-sidebar-foreground">ADmyBRAND</h1>
              <p className="text-xs text-sidebar-foreground/60">Insights</p>
            </div>
          )}
        </div>
        {/* Navigation */}
        <nav className={cn(
          "flex-1 pt-2 pb-0 grid gap-1 transition-all duration-300 ease-in-out",
          collapsed ? "pl-0 pr-0" : "pl-2 pr-2"
        )}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-lg transition-all duration-200 group min-h-[44px]",
                  collapsed ? "flex items-center justify-center w-full" : "flex items-center gap-3",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive 
                    ? "bg-primary text-white shadow-glow" 
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                )}
                title={item.title}
              >
                <Icon className={cn(
                  "transition-colors",
                  collapsed ? "w-7 h-7 min-w-[1.75rem] min-h-[1.75rem] mx-auto" : "w-5 h-5",
                  isActive ? "text-white" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                )} />
                {!collapsed && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className={cn(
                      "text-xs transition-colors",
                      isActive 
                        ? "text-white/90" 
                        : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground/80"
                    )}>
                      {item.description}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
        {/* Collapse and Profile at Bottom */}
        <div className="flex flex-col gap-0 mt-auto pb-2">
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            collapsed ? "px-0" : "pl-2 pr-2"
          )}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className={cn(
                "w-full justify-center hover:bg-sidebar-accent transition-colors transition-all duration-300",
                collapsed && "px-2"
              )}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <ChevronLeft 
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  collapsed && "rotate-180"
                )} 
              />
              {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
            </Button>
          </div>
          {/* Profile Section */}
          {!collapsed && (
            <div className="pl-2 pr-2 pt-1">
              <div className="space-y-3">
                {/* User Profile Card */}
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50 cursor-pointer hover:bg-sidebar-accent/70 transition-colors"
                  onClick={() => setProfileOpen(true)}
                  title="Open Profile"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-white">AD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      Admin User
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      admin@admybrand.com
                    </p>
                  </div>
                </div>
                {/* Profile Actions */}
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-8 hover:bg-sidebar-accent"
                    onClick={() => setProfileOpen(true)}
                    title="Profile Settings"
                  >
                    <User className="w-3 h-3 mr-2" />
                    Profile Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-8 hover:bg-sidebar-accent text-destructive hover:text-destructive"
                    title="Sign Out"
                  >
                    <LogOut className="w-3 h-3 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Collapsed Profile */}
          {collapsed && (
            <div className="flex justify-center items-end h-16 mt-2 transition-all duration-300 ease-in-out">
              <div 
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors transition-all duration-300"
                onClick={() => setProfileOpen(true)}
                title="Open Profile"
              >
                <span className="text-sm font-medium text-white">AD</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-white">AD</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Admin User</h3>
                <p className="text-sm text-muted-foreground">admin@admybrand.com</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Administrator
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Mail className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">admin@admybrand.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Details */}
            <div className="space-y-4">
              <h4 className="font-medium">Account Details</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">January 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium">Today, 2:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Timezone</span>
                  <span className="text-sm font-medium">IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Security
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Preferences
                </Button>
                <Button variant="outline" size="sm" className="text-xs text-destructive">
                  <LogOut className="w-3 h-3 mr-1" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}