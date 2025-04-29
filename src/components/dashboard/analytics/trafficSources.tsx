import React, { CSSProperties } from "react";
import { Globe } from "lucide-react";
import { scaleBand, scaleLinear, max } from "d3";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "@/components/dashboard/client-tooltip"; // assuming Tooltip.tsx is implemented

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

export default function TrafficSourcesChart({ analyticsData }: { analyticsData: AnalyticsData }) {
  const data = (analyticsData?.analytics?.sourceAnalytics || [])
    .map((d) => ({
      key: d.sourceName,
      value: d.visitors,
      color: "from-blue-300 to-blue-400", // You can change color mapping if needed
    }))
    .sort((a, b) => b.value - a.value);

  // Handle empty data
  if (data.length === 0) {
    return (
      <Card className="shadow-md border border-blue-300 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
        <CardHeader className="pb-2 px-4 border-b">
          <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
            <Globe className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
            Traffic Sources
          </CardTitle>
          <CardDescription className="dark:text-blue-200">Where your visitors are coming from</CardDescription>
        </CardHeader>
        <CardContent className="p-4 h-72 flex items-center justify-center">
          <p className="text-gray-500 text-center dark:text-blue-300">
            <span className="block text-4xl mb-2 text-blue-300 dark:text-blue-200">📊</span>
            No traffic source data available
          </p>
        </CardContent>
      </Card>
    );
  }

  // Scales
  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.175);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([0, 100]);

  const longestWord = max(data.map((d) => d.key.length)) || 1;

  return (
    <Card className="shadow-md border border-blue-200 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
          <Globe className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
          Traffic Sources
        </CardTitle>
        <CardDescription className="dark:text-blue-200">Where your visitors are coming from</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div
          className="relative w-full h-72"
          style={
            {
              "--marginTop": "0px",
              "--marginRight": "0px",
              "--marginBottom": "16px",
              "--marginLeft": `${longestWord * 7}px`,
            } as CSSProperties
          }
        >
          {/* Chart Area */}
          <div
            className="absolute inset-0
            z-10
            h-[calc(100%-var(--marginTop)-var(--marginBottom))]
            translate-y-[var(--marginTop)]
            w-[calc(100%-var(--marginLeft)-var(--marginRight))]
            translate-x-[var(--marginLeft)]
            overflow-visible"
          >
            {data.map((d, index) => {
              const barWidth = xScale(d.value);
              const barHeight = yScale.bandwidth();

              return (
                <ClientTooltip key={index}>
                  <TooltipTrigger>
                    <div
                      style={{
                        position: "absolute",
                        left: "0",
                        top: `${yScale(d.key)}%`,
                        width: `${barWidth}%`,
                        height: `${barHeight}%`,
                        borderRadius: "0 6px 6px 0", // Rounded right corners
                      }}
                      className={`bg-gradient-to-b ${d.color}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="font-medium dark:text-blue-200">{d.key}</div>
                    <div className="text-gray-500 text-sm dark:text-blue-300">{d.value} Visitors</div>
                  </TooltipContent>
                </ClientTooltip>
              );
            })}

            {/* Grid Lines */}
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {xScale.ticks(8).map((tickValue, i) => (
                <g
                  transform={`translate(${xScale(tickValue)},0)`}
                  className="text-gray-300/80 dark:text-gray-800/80"
                  key={i}
                >
                  <line
                    y1={0}
                    y2={100}
                    stroke="currentColor"
                    strokeDasharray="6,5"
                    strokeWidth={0.5}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>

            {/* X Axis */}
            {xScale.ticks(4).map((value, i) => (
              <div
                key={i}
                style={{
                  left: `${xScale(value)}%`,
                  top: "100%",
                }}
                className="absolute text-xs -translate-x-1/2 tabular-nums text-gray-400 dark:text-blue-300"
              >
                {value}
              </div>
            ))}
          </div>

          {/* Y Axis */}
          <div
            className="h-[calc(100%-var(--marginTop)-var(--marginBottom))]
            w-[var(--marginLeft)]
            translate-y-[var(--marginTop)]
            overflow-visible"
          >
            {data.map((entry, i) => (
              <span
                key={i}
                style={{
                  left: "-8px",
                  top: `${yScale(entry.key)! + yScale.bandwidth() / 2}%`,
                }}
                className="absolute text-xs text-gray-400 -translate-y-1/2 w-full text-right dark:text-blue-300"
              >
                {entry.key.length > 15
                  ? `${entry.key.substring(0, 12)}...`
                  : entry.key}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
