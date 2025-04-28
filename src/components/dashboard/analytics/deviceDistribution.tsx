import React from "react";
import { pie, arc, PieArcDatum } from "d3";
import { Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "@/components/dashboard/client-tooltip"; // assuming Tooltip.tsx is implemented

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

export default function DeviceDistributionChart({ analyticsData }: { analyticsData: AnalyticsData }) {
  const radius = 100;
  const gap = 0.01;
  
  // Colors for different device types
  const colors = [
    { colorFrom: "text-emerald-400", colorTo: "text-emerald-500" },
    { colorFrom: "text-blue-400", colorTo: "text-blue-500" },
    { colorFrom: "text-purple-400", colorTo: "text-purple-500" },
    { colorFrom: "text-pink-400", colorTo: "text-pink-500" },
    { colorFrom: "text-amber-400", colorTo: "text-amber-500" },
    { colorFrom: "text-sky-400", colorTo: "text-sky-500" }
  ];

  const data = analyticsData?.analytics?.deviceAnalytics?.map((device, index) => ({
    name: device.deviceType,
    value: device.visitors,
    colorFrom: colors[index % colors.length].colorFrom,
    colorTo: colors[index % colors.length].colorTo
  })) || [];

  // Pie layout and arc generator
  const pieLayout = pie<typeof data[0]>()
    .sort(null)
    .value(d => d.value)
    .padAngle(gap);

  const arcGenerator = arc<PieArcDatum<typeof data[0]>>()
    .innerRadius(radius * 0.5) // Donut chart effect
    .outerRadius(radius)
    .cornerRadius(4);

  const arcs = pieLayout(data);

  // Calculate total visitors for percentage
  const totalVisitors = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="shadow-md border border-blue-200 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-blue-900/40">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
          <Smartphone className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
          Device Distribution
        </CardTitle>
        <CardDescription className="dark:text-blue-200">What devices your visitors use</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72 relative">
          {data.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg
                  viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
                  className="w-full h-full"
                >
                  {arcs.map((d, i) => {
                    const midAngle = (d.startAngle + d.endAngle) / 2;
                    return (
                      <ClientTooltip key={i}>
                        <TooltipTrigger>
                          <g>
                            <path
                              d={arcGenerator(d) || ""}
                              fill={`url(#pieGradient-${i})`}
                            />
                            <defs>
                              <linearGradient
                                id={`pieGradient-${i}`}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                                gradientTransform={`rotate(${(midAngle * 180) / Math.PI - 90})`}
                              >
                                <stop offset="0%" stopColor="currentColor" className={d.data.colorFrom} />
                                <stop offset="100%" stopColor="currentColor" className={d.data.colorTo} />
                              </linearGradient>
                            </defs>
                          </g>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="font-medium">{d.data.name}</div>
                          <div className="text-sm">
                            {d.data.value.toLocaleString()} visitors
                            <span className="ml-1 text-gray-400">
                              ({((d.data.value / totalVisitors) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </TooltipContent>
                      </ClientTooltip>
                    );
                  })}
                </svg>
              </div>
              
              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
                {data.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-3 h-3 mr-2 rounded-sm ${item.colorFrom.replace('text-', 'bg-')}`}></div>
                    <div className="text-sm">
                      <span className="font-medium dark:text-blue-200">{item.name}</span>
                      <span className="ml-2 text-gray-500 text-xs dark:text-blue-300">
                        {((item.value / totalVisitors) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-500 text-center dark:text-blue-300">
                <span className="block text-4xl mb-2 text-green-300 dark:text-blue-200">📱</span>
                No device data available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}