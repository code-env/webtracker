// components/dashboard/dashboard-cards.tsx
"use client";

import { BarChart as BarChartIcon, PieChart as PieChartIcon, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CountryAnalytics {
  countryCode: string;
  countryName: string;
  visitors: number;
}

interface Visit {
    timestamp: string;
    visitorId: string;
    sessionId?: string;
    url?: string;
  }

interface Analytics {
  visitHistory: Visit[];
  countryAnalytics: CountryAnalytics[];
  totalPageVisits?: number;
  totalVisitors?: number;
}

interface AnalyticsData {
  analytics: Analytics;
}

export default function DashboardCards({ analyticsData }: { analyticsData: AnalyticsData }) {
  // Calculate total page views
  const calculateTotalPageViews = (): number => {
    if (!analyticsData?.analytics?.visitHistory) return 0;
    return analyticsData?.analytics?.totalPageVisits || 0;
  };

  // Calculate unique visitors
  const calculateUniqueVisitors = (): number => {
    if (!analyticsData?.analytics?.visitHistory) return 0;
    return analyticsData?.analytics?.totalVisitors || 0;
  };

  // Get countries count
  const countryCount = analyticsData?.analytics?.countryAnalytics?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <BarChartIcon className="h-5 w-5 mr-2 text-blue-500" />
            Total Page Views
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-3xl font-bold text-blue-600">
            {calculateTotalPageViews().toLocaleString()}
          </div>
          <div className="text-sm text-blue-500 font-medium mt-1">
            Analytics since project creation
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
            Total Visitors
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-3xl font-bold text-blue-600">
            {calculateUniqueVisitors().toLocaleString()}
          </div>
          <div className="text-sm text-blue-500 font-medium mt-1">
            Analytics since project creation
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <Globe className="h-5 w-5 mr-2 text-blue-500" />
            Audience Reach
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-3xl font-bold text-blue-600">
            {countryCount > 0 ? countryCount.toLocaleString() : 0} Countries
          </div>
          <div className="text-sm text-blue-500 font-medium mt-1">
            Global audience distribution
          </div>
        </CardContent>
      </Card>
    </div>
  );
}