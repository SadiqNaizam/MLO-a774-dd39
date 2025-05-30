import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import StatsSummary from '../components/Dashboard/StatsSummary';

/**
 * LeadsDashboardPage serves as the main overview page for lead management.
 * It utilizes the MainAppLayout for the overall page structure (sidebar, header)
 * and displays key dashboard components: StatsCardGrid and StatsSummary.
 */
const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        The MainAppLayout already provides a container with 'flex flex-col gap-6'.
        StatsCardGrid and StatsSummary will be direct children of this container,
        arranging them vertically with spacing.
      */}
      <StatsCardGrid />
      <StatsSummary />
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
