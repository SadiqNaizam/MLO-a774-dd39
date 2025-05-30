import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu as MenuIcon } from 'lucide-react';

interface HeaderProps {
  className?: string;
  onToggleMobileMenu: () => void; 
}

const Header: React.FC<HeaderProps> = ({ className, onToggleMobileMenu }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 lg:left-64 right-0 z-10',
        'flex items-center justify-between px-6 bg-prd-surface h-[60px] border-b border-prd-border',
        className
      )}
    >
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden mr-2 text-prd-primary-text hover:bg-prd-accent-blue/10"
          onClick={onToggleMobileMenu}
          aria-label="Toggle menu"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold text-prd-primary-text">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-prd-accent-blue hover:bg-prd-accent-blue/90 text-primary-foreground rounded-sm px-4 py-2 text-sm">
              Create <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-prd-surface border-prd-border rounded-md w-48 shadow-lg"
          >
            <DropdownMenuItem className="text-prd-primary-text hover:!bg-prd-accent-blue/10 focus:!bg-prd-accent-blue/10 cursor-pointer py-2 px-3 text-sm">New Lead</DropdownMenuItem>
            <DropdownMenuItem className="text-prd-primary-text hover:!bg-prd-accent-blue/10 focus:!bg-prd-accent-blue/10 cursor-pointer py-2 px-3 text-sm">New Proposal</DropdownMenuItem>
            <DropdownMenuItem className="text-prd-primary-text hover:!bg-prd-accent-blue/10 focus:!bg-prd-accent-blue/10 cursor-pointer py-2 px-3 text-sm">New Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
