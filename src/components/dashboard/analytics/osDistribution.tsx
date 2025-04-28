// components/dashboard/analytics/operatingSystems.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Monitor } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AnalyticsData, OsChartData } from "@/lib/types";

interface PayloadInterface {
  value: number;
  name: string;
  payload: {
    osName: string;
    visitors: number;
  };
}

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<PayloadInterface>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium text-gray-700">{label}</p>
        <p className="text-amber-600 font-semibold">{`Visits: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Format OS data for the chart
const formatOSData = (analyticsData: AnalyticsData | null): OsChartData[] => {
  if (!analyticsData?.analytics?.osAnalytics?.length) return [];

  return analyticsData.analytics.osAnalytics
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5)
    .map((os) => ({
      site: os.osName,
      visits: os.visitors,
    }));
};

export default function OperatingSystemsChart({ 
  analyticsData 
}: { 
  analyticsData: AnalyticsData | null 
}) {
  const osData = formatOSData(analyticsData);

  return (
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <Monitor className="h-5 w-5 mr-2 text-blue-500" />
          Top Operating Systems
        </CardTitle>
        <CardDescription>
          What systems your visitors use
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {osData.length > 0 ? (
              <BarChart
                data={osData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="site"
                  tick={{ fontSize: 12 }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="visits"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  <span className="block text-4xl mb-2 text-amber-300">
                    💻
                  </span>
                  No OS data available
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}