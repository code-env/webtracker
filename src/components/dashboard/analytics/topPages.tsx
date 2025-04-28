// components/dashboard/top-pages-chart.tsx
"use client";

import { BarChart as BarChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RouteAnalytics {
  id: string;
  route: string;
  pageVisits: number;
  visitors: number;
}

interface Analytics {
  routeAnalytics: RouteAnalytics[];
}

interface AnalyticsData {
  analytics: Analytics;
}

interface BarChartData {
  page: string;
  views: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium text-gray-700">{label}</p>
        <p className="text-blue-600 font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function TopPagesChart({ analyticsData }: { analyticsData: AnalyticsData }) {
  // Format route analytics data for bar chart
  const formatRouteData = (): BarChartData[] => {
    if (!analyticsData?.analytics?.routeAnalytics?.length) return [];

    return analyticsData.analytics.routeAnalytics
      .sort((a: RouteAnalytics, b: RouteAnalytics) => b.pageVisits - a.pageVisits)
      .slice(0, 5)
      .map((route: RouteAnalytics) => ({
        page: route.route,
        views: route.pageVisits,
      }));
  };

  const topPagesData = formatRouteData();

  return (
    <Card className="shadow-md border-0 overflow-hidden mb-6">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <BarChartIcon className="h-5 w-5 mr-2 text-blue-500" />
          Top Pages
        </CardTitle>
        <CardDescription>Your most visited pages</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {topPagesData.length > 0 ? (
              <BarChart
                data={topPagesData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="page"
                  type="category"
                  width={120}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    value.length > 15 ? `${value.substring(0, 12)}...` : value
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="views"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  <span className="block text-4xl mb-2 text-blue-300">📄</span>
                  No page data available
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}