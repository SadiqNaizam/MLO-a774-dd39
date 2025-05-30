import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  UsersRound,
  FileText,
  Receipt,
  ShoppingBag,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu as MenuIcon,
  BoxIcon
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isBeta?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive, isBeta }) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-prd-accent-blue/10 hover:text-prd-accent-blue',
        isActive ? 'bg-prd-accent-blue/10 text-prd-accent-blue' : 'text-prd-secondary-text',
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
      {isBeta && (
        <span className="ml-auto text-xs bg-prd-accent-yellow/20 text-prd-accent-yellow px-1.5 py-0.5 rounded-sm">
          Beta
        </span>
      )}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const mainNavItems: NavItemProps[] = [
    { href: '#', icon: LayoutDashboard, label: 'Dashboard', isActive: true },
    { href: '#', icon: UsersRound, label: 'Leads' },
    { href: '#', icon: UsersRound, label: 'Customers' }, // Assuming Customers also uses UsersRound or similar
    { href: '#', icon: FileText, label: 'Proposals' },
    { href: '#', icon: Receipt, label: 'Invoices' },
    { href: '#', icon: ShoppingBag, label: 'Items' },
    { href: '#', icon: Mail, label: 'Mail' },
    { href: '#', icon: Archive, label: 'Shoebox' },
    { href: '#', icon: CalendarDays, label: 'Calendar' },
  ];

  const secondaryNavItems: NavItemProps[] = [
    { href: '#', icon: HelpCircle, label: 'Help' },
    { href: '#', icon: Settings, label: 'Settings' },
    // The image showed a second Help, renaming to Support for clarity
    { href: '#', icon: HelpCircle, label: 'Support' }, 
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-full w-64 bg-sidebar text-prd-primary-text flex flex-col transition-all duration-300 ease-in-out',
        'lg:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}
    >
      <div className="flex items-center justify-between h-[60px] px-6 border-b border-prd-border">
        <div className="flex items-center">
          <BoxIcon className="h-8 w-8 text-prd-accent-blue mr-2" /> 
          <span className="text-xl font-bold text-prd-primary-text">Lead Co.</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-prd-secondary-text">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <span className="px-4 py-2 text-xs font-semibold text-prd-secondary-text uppercase tracking-wider">Menu</span>
        {mainNavItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="p-4 border-t border-prd-border">
        <div className="space-y-1">
          {secondaryNavItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
