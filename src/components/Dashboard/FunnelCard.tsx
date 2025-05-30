import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  leads: number;
  value: number;
  avgTime: string;
  color: string; // Tailwind background color class e.g. 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', leads: 200, value: 200, avgTime: '2 days', color: 'bg-prd-accent-red' },
  { id: 'qualified', name: 'Qualified', leads: 100, value: 100, avgTime: '2 days', color: 'bg-prd-accent-yellow' },
  { id: 'inConversation', name: 'In conversation', leads: 50, value: 100, avgTime: 'N/A', color: 'bg-prd-accent-blue' }, // No avgTime in image for this
  { id: 'negotiations', name: 'Negotiations', leads: 20, value: 50, avgTime: '8 days', color: 'bg-prd-accent-green' },
  { id: 'closedWon', name: 'Closed won', leads: 20, value: 50, avgTime: '10 days', color: 'bg-purple-600' }, // Using generic purple as no PRD purple defined
];

interface FunnelCardProps {
  className?: string;
}

const FunnelCard: React.FC<FunnelCardProps> = ({ className }) => {
  const totalActiveLeads = 600;
  const totalFunnelLeads = funnelData.reduce((sum, stage) => sum + stage.leads, 0);

  return (
    <Card className={cn('w-full bg-prd-surface rounded-md shadow-sm', className)}>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-semibold text-prd-primary-text'>Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-prd-primary-text">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-prd-secondary-text">active leads</span>
        </div>

        <div className="mb-4">
          <div className="flex w-full h-3 rounded-full overflow-hidden bg-gray-200">
            {funnelData.map((stage) => (
              <TooltipProvider key={stage.id} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(stage.color, 'h-full')}
                      style={{ width: `${(stage.leads / totalFunnelLeads) * 100}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-prd-primary-text text-primary-foreground rounded-sm">
                    <p>{stage.name}: {stage.leads} leads</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <ul className="space-y-3">
          {funnelData.map((stage) => (
            <li key={stage.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={cn(stage.color, 'w-3 h-3 rounded-sm mr-3')}></span>
                <span className="text-prd-primary-text">{stage.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-prd-secondary-text w-10 text-right">{stage.leads}</span>
                <span className="text-prd-secondary-text w-12 text-right">${stage.value}</span>
                <span className="text-prd-secondary-text w-16 text-right">
                  {stage.avgTime}
                  {stage.id === 'qualified' && (
                     <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className='ml-1 relative top-px cursor-help text-xs bg-prd-primary-text text-primary-foreground px-1 rounded-sm'>i</span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-prd-primary-text text-primary-foreground rounded-sm">
                            <p>average time on this stage</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelCard;
