import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar'; 
import Header from './Header';   
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background text-prd-primary-text">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        closeMobileMenu={closeMobileMenu} 
      />
      <Header 
        onToggleMobileMenu={toggleMobileMenu}
      />
      <main 
        className={cn(
          "mt-[60px]",             // For fixed header height (h-[60px])
          "lg:ml-64",             // For fixed sidebar width (w-64)
          "p-6",                  // Padding for the content area
          "min-w-0",              // To prevent flexbox/grid blowout
          "overflow-y-auto"       // Allow scrolling for main content
        )}
        style={{ height: 'calc(100vh - 60px)' }} // Ensures main area takes up viewport height below header
      >
        {/* This inner div implements the 'mainContent.container' requirement: "flex flex-col gap-6" */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
