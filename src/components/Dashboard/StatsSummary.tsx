import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReasonLost {
  percentage: number;
  reason: string;
}

const reasonsLostData: ReasonLost[] = [
  { percentage: 40, reason: 'The proposal is unclear' },
  { percentage: 20, reason: 'However venture pursuit' },
  { percentage: 10, reason: 'Other' },
  { percentage: 30, reason: 'Product/Market fit issues' }, // Changed from duplicate
];

interface OtherStat {
  value: string;
  label: string;
  tooltip?: string;
}

const otherData: OtherStat[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days' },
];

interface StatsSummaryProps {
  className?: string;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <Card className="bg-prd-surface rounded-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {reasonsLostData.map((item, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-prd-primary-text">{item.percentage}%</p>
                <p className="text-sm text-prd-secondary-text mt-1">{item.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-prd-surface rounded-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherData.map((item, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-prd-primary-text">{item.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-prd-secondary-text">{item.label}</p>
                  {item.tooltip && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-prd-secondary-text ml-1.5 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-prd-primary-text text-primary-foreground rounded-sm">
                          <p>{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSummary;
