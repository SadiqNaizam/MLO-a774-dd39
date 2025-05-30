import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceDataPoint {
  name: string;
  value: number; // This represents the monetary value from the image ($3000, $1000 etc)
  percentage: number;
  color: string;
}

const leadsCameData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F06548' }, // prd-accent-red
  { name: 'Behance', value: 1000, percentage: 25, color: '#F5B84C' }, // prd-accent-yellow
  { name: 'Instagram', value: 1000, percentage: 15, color: '#0AB39C' }, // prd-accent-green
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#299CDB' }, // prd-accent-blue
];

// Dummy data for other tabs - in a real app, this would change
const leadsConvertedData: SourceDataPoint[] = leadsCameData.map(d => ({...d, value: d.value * 0.8, percentage: d.percentage * 0.9 })).sort((a,b) => b.percentage - a.percentage);
const totalDealsSizeData: SourceDataPoint[] = leadsCameData.map(d => ({...d, value: d.value * 1.2, percentage: d.percentage * 1.1 })).sort((a,b) => b.percentage - a.percentage);

const dataMap = {
  'leads-came': leadsCameData,
  'leads-converted': leadsConvertedData,
  'total-deals': totalDealsSizeData,
};

interface SourceCardProps {
  className?: string;
}

const SourceCard: React.FC<SourceCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<keyof typeof dataMap>('leads-converted');
  const currentData = dataMap[activeTab];

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-sm mr-2"></span>
              <span className="text-prd-primary-text">{entry.payload.name}</span>
            </div>
            <div className="flex items-center text-prd-secondary-text">
              <span className="w-12 text-right">${entry.payload.value.toLocaleString()}</span>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <span className="w-8 text-right cursor-default">{entry.payload.percentage.toFixed(0)}%</span>
                  </TooltipTrigger>
                   <TooltipContent className="bg-prd-primary-text text-primary-foreground rounded-sm">
                    <p>from leads total</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className={cn('w-full bg-prd-surface rounded-md shadow-sm', className)}>
      <CardHeader className='pb-2 flex flex-row items-center justify-between'>
        <div>
          <CardTitle className='text-lg font-semibold text-prd-primary-text'>Sources</CardTitle>
        </div>
        <Button variant="outline" className="text-xs text-prd-secondary-text border-prd-border rounded-sm">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full mx-auto mb-2 max-w-xs">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50} // For Donut shape
                fill="#8884d8"
                dataKey="percentage"
                stroke="hsl(var(--card))" // card background color for spacing between segments
                strokeWidth={3}
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--border))'}}
                itemStyle={{ color: 'hsl(var(--card-foreground))'}}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as keyof typeof dataMap)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-prd-sidebar rounded-sm p-1 h-auto">
            <TabsTrigger value="leads-came" className="text-xs data-[state=active]:bg-prd-surface data-[state=active]:text-prd-accent-blue data-[state=active]:shadow-sm rounded-sm py-1.5">Leads came</TabsTrigger>
            <TabsTrigger value="leads-converted" className="text-xs data-[state=active]:bg-prd-surface data-[state=active]:text-prd-accent-blue data-[state=active]:shadow-sm rounded-sm py-1.5">Leads Converted</TabsTrigger>
            <TabsTrigger value="total-deals" className="text-xs data-[state=active]:bg-prd-surface data-[state=active]:text-prd-accent-blue data-[state=active]:shadow-sm rounded-sm py-1.5">Total deals size</TabsTrigger>
          </TabsList>
          {/* Content for tabs is implicitly handled by re-rendering the chart and legend based on activeTab state */}
        </Tabs>

        <CustomLegend payload={currentData.map(d => ({payload: d, color: d.color}))} />

      </CardContent>
    </Card>
  );
};

export default SourceCard;
