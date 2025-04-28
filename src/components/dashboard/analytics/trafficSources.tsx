// components/dashboard/traffic-sources-chart.tsx
"use client";

import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface SourceAnalytics {
  sourceName: string;
  visitors: number;
}

interface Analytics {
  sourceAnalytics: SourceAnalytics[];
}

interface AnalyticsData {
  analytics: Analytics;
}

interface PieChartData {
  name: string;
  value: number;
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

export default function TrafficSourcesChart({ analyticsData }: { analyticsData: AnalyticsData }) {
  // Colors for charts
  const COLORS = {
    blue: ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
  };

  // Format source analytics data
  const formatSourceData = (): PieChartData[] => {
    if (!analyticsData?.analytics?.sourceAnalytics?.length) return [];

    return analyticsData.analytics.sourceAnalytics.map(
      (source: SourceAnalytics) => ({
        name: source.sourceName,
        value: source.visitors,
      })
    );
  };

  const trafficSourcesData = formatSourceData();

  return (
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <Globe className="h-5 w-5 mr-2 text-blue-500" />
          Traffic Sources
        </CardTitle>
        <CardDescription>Where your visitors are coming from</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {trafficSourcesData.length > 0 ? (
              <BarChart
                data={trafficSourcesData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 30,
                  left: 70,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12 }}
                  width={60}
                  tickFormatter={(value) =>
                    value.length > 12 ? `${value.substring(0, 10)}...` : value
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  name="Visitors"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS.blue[index % COLORS.blue.length]}
                    />
                  ))}
                </Bar>
                <Legend />
              </BarChart>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  <span className="block text-4xl mb-2 text-blue-300">📊</span>
                  No traffic source data available
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}