import React from 'react';
import { cn } from '@/lib/utils';
import FunnelCard from './FunnelCard';
import SourceCard from './SourceCard';
import TrackingChart from './TrackingChart';

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <FunnelCard />
      <SourceCard />
      <TrackingChart className="lg:col-span-2" />
    </div>
  );
};

export default StatsCardGrid;
