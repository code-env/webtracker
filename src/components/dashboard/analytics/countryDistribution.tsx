// components/dashboard/analytics/countryDistribution.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AnalyticsData, CountryChartData, PIECHARTCOLORS } from "@/lib/types";

interface PayloadInterface {
  value: number;
  name: string;
  payload: {
    country: string;
    visitors: number;
  };
}

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<PayloadInterface>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium text-gray-700">{payload[0].payload.country}</p>
        <p className="text-blue-600 font-semibold">{`Visitors: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Format country data for the chart
const formatCountryData = (analyticsData: AnalyticsData | null): CountryChartData[] => {
  if (!analyticsData?.analytics?.countryAnalytics?.length) return [];

  return analyticsData.analytics.countryAnalytics
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5)
    .map((country) => ({
      country: country.countryName,
      visitors: country.visitors,
    }));
};

export default function CountryDistribution({ 
  analyticsData 
}: { 
  analyticsData: AnalyticsData | null 
}) {
  const countryData = formatCountryData(analyticsData);

  return (
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <Globe className="h-5 w-5 mr-2 text-blue-500" />
          Visitor Geography
        </CardTitle>
        <CardDescription>
          Distribution of visitors by country
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {countryData.length > 0 ? (
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="visitors"
                  nameKey="country"
                  label={({ country, percent }) =>
                    `${country}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {countryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIECHARTCOLORS[index % PIECHARTCOLORS.length]}
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
                  <span className="block text-4xl mb-2 text-purple-300">
                    🌎
                  </span>
                  No country data available
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}