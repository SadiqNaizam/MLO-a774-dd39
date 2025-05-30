import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface TrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const trackingData: TrackingDataPoint[] = [
  { month: 'March', closedWon: 88, closedLost: 68 },
  { month: 'April', closedWon: 70, closedLost: 38 },
  { month: 'May', closedWon: 65, closedLost: 38 },
  { month: 'June', closedWon: 72, closedLost: 5 },
  { month: 'July', closedWon: 80, closedLost: 40 },
  { month: 'August', closedWon: 90, closedLost: 65 },
];

const totalClosed = 680;
const totalLost = 70;

interface TrackingChartProps {
  className?: string;
}

const TrackingChart: React.FC<TrackingChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full bg-prd-surface rounded-md shadow-sm', className)}>
      <CardHeader className='pb-2 flex flex-row items-start justify-between'>
        <div>
          <CardTitle className='text-lg font-semibold text-prd-primary-text'>Leads tracking</CardTitle>
          <div className="mt-1">
            <span className="text-2xl font-bold text-prd-primary-text">{totalClosed}</span>
            <span className="ml-1 text-sm text-prd-secondary-text">total closed</span>
            <span className="text-2xl font-bold text-prd-primary-text ml-4">{totalLost}</span>
            <span className="ml-1 text-sm text-prd-secondary-text">total lost</span>
          </div>
        </div>
        <Button variant="outline" className="text-xs text-prd-secondary-text border-prd-border rounded-sm">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--border))'}}
                itemStyle={{ color: 'hsl(var(--card-foreground))'}}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="square"
                iconSize={10}
                formatter={(value, entry) => <span className="text-prd-secondary-text text-sm ml-1">{value}</span>}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#0AB39C" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#F06548" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingChart;
