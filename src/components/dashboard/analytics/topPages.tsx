import React, { CSSProperties } from "react";
import { BarChart as BarChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { scaleBand, scaleLinear, max } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "@/components/dashboard/client-tooltip";

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

export default function TopPagesChart({ analyticsData }: { analyticsData: AnalyticsData }) {
  const formatRouteData = () => {
    if (!analyticsData?.analytics?.routeAnalytics?.length) return [];

    return analyticsData.analytics.routeAnalytics
      .sort((a, b) => b.pageVisits - a.pageVisits)
      .slice(0, 5)
      .map((route) => ({
        key: route.route,
        value: route.pageVisits,
        color: "from-blue-300 to-blue-400",
      }));
  };

  const data = formatRouteData();

  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.175);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([0, 100]);

  const longestWord = Math.max(...data.map((d) => d.key.length), 1);

  return (
    <Card className="shadow-md border border-blue-200 overflow-hidden bg-gradient-to-br from-blue-50 to-white mb-6 dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
          <BarChartIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
          Top Pages
        </CardTitle>
        <CardDescription className="dark:text-blue-200">Your most visited pages</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div
          className="relative w-full h-72"
          style={
            {
              "--marginTop": "0px",
              "--marginRight": "0px",
              "--marginBottom": "16px",
              "--marginLeft": `${longestWord}px`,
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
              overflow-visible
            "
          >
            {data.length > 0 ? (
              <>
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
                            borderRadius: "0 6px 6px 0",
                            cursor: "pointer",
                          }}
                          className={`bg-gradient-to-b ${d.color}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-sm dark:text-blue-200">{d.key}</span>
                          <span className="text-xs text-gray-500 dark:text-blue-300">{d.value} visits</span>
                        </div>
                      </TooltipContent>
                    </ClientTooltip>
                  );
                })}

                {/* Background Grid */}
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {xScale.ticks(8).map(xScale.tickFormat(8, "d")).map((tick, i) => (
                    <g
                      transform={`translate(${xScale(+tick)},0)`}
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

                {/* X Axis (Values) */}
                {xScale.ticks(10).map((value, i) => (
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
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500 text-center dark:text-blue-300">
                  <span className="block text-4xl mb-2 text-blue-300 dark:text-blue-200">📄</span>
                  No page data available
                </p>
              </div>
            )}
          </div>

          {/* Y Axis (Pages) */}
          <div
            className="
              h-[calc(100%-var(--marginTop)-var(--marginBottom))]
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
                {entry.key.length > 15 ? `${entry.key.slice(0, 12)}...` : entry.key}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
