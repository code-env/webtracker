import React, { CSSProperties } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";
import { scaleBand, scaleLinear, max } from "d3";
import { AnalyticsData, OsChartData } from "@/lib/types";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "@/components/dashboard/client-tooltip"; // ✅ Imported tooltip components

function formatOSData(analyticsData: AnalyticsData | null): OsChartData[] {
  if (!analyticsData?.analytics?.osAnalytics?.length) return [];

  return analyticsData.analytics.osAnalytics
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5)
    .map((os) => ({
      site: os.osName,
      visits: os.visitors,
    }));
}

export default function OperatingSystemsChart({ 
  analyticsData 
}: { 
  analyticsData: AnalyticsData | null 
}) {
  const osData = formatOSData(analyticsData);
  const minBars = 5;

  const filledData = [
    ...osData,
    ...Array.from({ length: Math.max(0, minBars - osData.length) }, (_, i) => ({
      site: `Empty ${i + 1}`,
      visits: 0,
    })),
  ];

  const xScale = scaleBand()
    .domain(filledData.map(d => d.site))
    .range([0, 100])
    .padding(0.3);

  const yScale = scaleLinear()
    .domain([0, max(osData.map(d => d.visits)) ?? 0])
    .range([100, 0]);

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
        <div
          className="relative h-72 w-full grid"
          style={
            {
              "--marginTop": "0px",
              "--marginRight": "25px",
              "--marginBottom": "56px",
              "--marginLeft": "25px",
            } as CSSProperties
          }
        >
          {/* Y axis */}
          <div
            className="relative
              h-[calc(100%-var(--marginTop)-var(--marginBottom))]
              w-[var(--marginLeft)]
              translate-y-[var(--marginTop)]
              overflow-visible
            "
          >
            {yScale
              .ticks(6)
              .map(yScale.tickFormat(6, "d"))
              .map((value, i) => (
                <div
                  key={i}
                  style={{
                    top: `${yScale(+value)}%`,
                  }}
                  className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-300 w-full text-right pr-2"
                >
                  {value}
                </div>
              ))}
          </div>

          {/* Chart Area */}
          <div
            className="absolute inset-0
              h-[calc(100%-var(--marginTop)-var(--marginBottom))]
              w-[calc(100%-var(--marginLeft)-var(--marginRight))]
              translate-x-[var(--marginLeft)]
              translate-y-[var(--marginTop)]
              overflow-visible
            "
          >
            <svg
              viewBox="0 0 100 100"
              className="overflow-visible w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {yScale
                .ticks(6)
                .map(yScale.tickFormat(6, "d"))
                .map((active, i) => (
                  <g
                    transform={`translate(0,${yScale(+active)})`}
                    className="text-gray-300/80 dark:text-gray-800/80"
                    key={i}
                  >
                    <line
                      x1={0}
                      x2={100}
                      stroke="currentColor"
                      strokeDasharray="6,5"
                      strokeWidth={0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ))}
            </svg>

            {/* X Axis Labels */}
            {osData.map((entry, i) => {
              const xPosition = xScale(entry.site)! + xScale.bandwidth() / 2;

              return (
                <div
                  key={i}
                  className="absolute overflow-visible text-gray-400"
                  style={{
                    left: `${xPosition}%`,
                    top: "100%",
                    transform: "rotate(45deg) translateX(4px) translateY(8px)",
                  }}
                >
                  <div className="absolute text-xs -translate-y-1/2 whitespace-nowrap">
                    {entry.site.slice(0, 10) + (entry.site.length > 10 ? "..." : "")}
                  </div>
                </div>
              );
            })}

            {/* Bars with Tooltip */}
            {filledData.map((d, index) => {
              const barWidth = xScale.bandwidth();
              const barHeight = yScale(0) - yScale(d.visits);

              return (
                <ClientTooltip key={index}>
                  <TooltipTrigger>
                    <div
                      style={{
                        width: `${barWidth}%`,
                        height: `${barHeight}%`,
                        borderRadius: "6px 6px 0 0",
                        marginLeft: `${xScale(d.site)}%`,
                      }}
                      className="absolute bottom-0 bg-gradient-to-b from-amber-200 to-amber-400 cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs font-medium">
                      {d.site}: {d.visits} visitors
                    </div>
                  </TooltipContent>
                </ClientTooltip>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
