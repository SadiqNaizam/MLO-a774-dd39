import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu as MenuIcon } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  // Example: a function to toggle mobile sidebar, if needed at this level
  // onToggleMobileSidebar?: () => void; 
}

const TopHeader: React.FC<TopHeaderProps> = ({ className /*, onToggleMobileSidebar*/ }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 lg:left-64 right-0 z-10 flex items-center justify-between px-6 bg-prd-surface h-[60px] border-b border-prd-border',
        className
      )}
    >
      <div className="flex items-center">
        {/* Hamburger icon for mobile, uncomment and implement if SidebarNav needs external toggle 
        <Button variant="ghost" size="icon" className="lg:hidden mr-4" onClick={onToggleMobileSidebar}>
          <MenuIcon className="h-6 w-6 text-prd-primary-text" />
        </Button>
        */}
        <h1 className="text-2xl font-semibold text-prd-primary-text">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-prd-accent-blue hover:bg-prd-accent-blue/90 text-primary-foreground rounded-sm">
              Create <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-prd-surface border-prd-border rounded-md">
            <DropdownMenuItem className="text-prd-primary-text hover:!bg-prd-accent-blue/10 focus:!bg-prd-accent-blue/10">New Lead</DropdownMenuItem>
            <DropdownMenuItem className="text-prd-primary-text hover:!bg-prd-accent-blue/10 focus:!bg-prd-accent-blue/10">New Proposal</DropdownMenuItem>
            <DropdownMenuItem className="text-prd-primary-text hover:!bg-prd-accent-blue/10 focus:!bg-prd-accent-blue/10">New Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
