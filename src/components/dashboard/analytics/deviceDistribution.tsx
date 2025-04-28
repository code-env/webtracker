// components/dashboard/device-distribution-chart.tsx
"use client";

import { Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DeviceAnalytics {
  deviceType: string;
  visitors: number;
}

interface Analytics {
  deviceAnalytics: DeviceAnalytics[];
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

export default function DeviceDistributionChart({ analyticsData }: { analyticsData: AnalyticsData }) {
  // Colors for charts
  const COLORS = {
    green: ["#065f46", "#047857", "#059669", "#10b981", "#34d399"],
  };

  // Format device analytics data
  const formatDeviceData = (): PieChartData[] => {
    if (!analyticsData?.analytics?.deviceAnalytics?.length) return [];

    return analyticsData.analytics.deviceAnalytics.map(
      (device: DeviceAnalytics) => ({
        name: device.deviceType,
        value: device.visitors,
      })
    );
  };

  const deviceData = formatDeviceData();

  return (
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
          Device Distribution
        </CardTitle>
        <CardDescription>What devices your visitors use</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {deviceData.length > 0 ? (
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS.green[index % COLORS.green.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  <span className="block text-4xl mb-2 text-green-300">📱</span>
                  No device data available
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}