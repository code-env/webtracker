import React from "react";
import { pie, arc, PieArcDatum } from "d3";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "@/components/dashboard/client-tooltip"; // assuming Tooltip.tsx is implemented
import Image from "next/image";
import { countryMap } from "@/lib/fullCountryMap";

interface CountryAnalytics {
  countryName: string;
  visitors: number;
}

interface Analytics {
  countryAnalytics: CountryAnalytics[];
}

interface AnalyticsData {
  analytics: Analytics;
}

// Helper function to get country codes for flags
const getCountryCode = (countryName: string): string => {
  return countryMap[countryName] || "un"; // Return UN flag as fallback
};

// Format country data for the chart
const formatCountryData = (analyticsData: AnalyticsData | null) => {
  if (!analyticsData?.analytics?.countryAnalytics?.length) return [];

  // Define color gradient pairs for different countries
  const colorPairs = [
    { colorFrom: "text-blue-400", colorTo: "text-blue-600" },
    { colorFrom: "text-red-400", colorTo: "text-red-600" },
    { colorFrom: "text-green-400", colorTo: "text-green-600" },
    { colorFrom: "text-purple-400", colorTo: "text-purple-600" },
    { colorFrom: "text-yellow-400", colorTo: "text-yellow-600" },
    { colorFrom: "text-indigo-400", colorTo: "text-indigo-600" },
    { colorFrom: "text-pink-400", colorTo: "text-pink-600" },
    { colorFrom: "text-teal-400", colorTo: "text-teal-600" },
  ];

  return analyticsData.analytics.countryAnalytics
    .sort((a, b) => b.visitors - a.visitors)
    .map((country, index) => ({
      name: country.countryName,
      value: country.visitors,
      flag: getCountryCode(country.countryName),
      colorFrom: colorPairs[index % colorPairs.length].colorFrom,
      colorTo: colorPairs[index % colorPairs.length].colorTo,
    }));
};

export default function CountryDistributionPieChart({ 
  analyticsData 
}: { 
  analyticsData: AnalyticsData | null 
}) {
  const allData = formatCountryData(analyticsData);
  // Still display top 8 in the pie chart for better visibility
  const data = allData.slice(0, 8);
  
  // Chart dimensions
  const radius = 100;
  const gap = 0.02; // Gap between slices

  // Pie layout and arc generator
  const pieLayout = pie<typeof data[0]>()
    .sort(null)
    .value(d => d.value)
    .padAngle(gap);

  const arcGenerator = arc<PieArcDatum<typeof data[0]>>()
    .innerRadius(radius * 0.4) // Create a donut chart with inner radius
    .outerRadius(radius)
    .cornerRadius(4);

  // Label positioning
  const labelRadius = radius * 0.7;
  const arcLabel = arc<PieArcDatum<typeof data[0]>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(data);
  
  // Calculate total visitors for percentage
  const totalVisitors = allData.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate the angle for each slice
  const computeAngle = (d: PieArcDatum<typeof data[0]>) => {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  };

  // Minimum angle to display label
  const MIN_ANGLE = 20;

  return (
    <Card className="shadow-md border border-blue-200 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
          <Globe className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
          Visitor Geography
        </CardTitle>
        <CardDescription className="dark:text-blue-200">
          Distribution of visitors by country
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 max-h-96 overflow-auto">
        <div className="relative">
          {data.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg
                  viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
                  className="w-full h-full overflow-visible"
                >
                  {/* Pie slices */}
                  {arcs.map((d, i) => {
                    const midAngle = (d.startAngle + d.endAngle) / 2;
                    return (
                      <ClientTooltip key={i}>
                        <TooltipTrigger>
                          <g>
                            <path
                              d={arcGenerator(d) || ""}
                              fill={`url(#countryGradient-${i})`}
                            />
                            <defs>
                              <linearGradient
                                id={`countryGradient-${i}`}
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
                          <div className="flex items-center gap-2">
                            <Image
                              src={`https://hatscripts.github.io/circle-flags/flags/${d.data.flag}.svg`}
                              alt={d.data.name}
                              width={16}
                              height={16}
                              className="rounded-full"
                            />
                            <span className="font-medium">{d.data.name}</span>
                          </div>
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
                
                {/* Labels on the chart */}
                <div className="absolute inset-0 pointer-events-none">
                  {arcs.map((d, i) => {
                    const angle = computeAngle(d);
                    if (angle <= MIN_ANGLE) return null;
                    
                    const [x, y] = arcLabel.centroid(d);
                    const CENTER_PCT = 50;
                    
                    // Position the flag
                    const flagLeft = `${CENTER_PCT + (x / radius) * 40}%`;
                    const flagTop = `${CENTER_PCT + (y / radius) * 40}%`;
                    
                    return (
                      <div key={i} className="absolute" style={{
                        left: flagLeft,
                        top: flagTop,
                        transform: "translate(-50%, -50%)"
                      }}>
                        <Image
                          src={`https://hatscripts.github.io/circle-flags/flags/${d.data.flag}.svg`}
                          alt={d.data.name}
                          width={20}
                          height={20}
                          className="rounded-full border border-white"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Legend with scrollable container */}
              <div className="mt-4 w-full">
                <div className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">Countries</div>
                <div className="max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    {allData.map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex items-center gap-2">
                          <Image
                            src={`https://hatscripts.github.io/circle-flags/flags/${item.flag}.svg`}
                            alt={item.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                          />
                          <div className="text-sm">
                            <span className="font-medium dark:text-blue-200">{item.name}</span>
                            <span className="ml-2 text-gray-500 text-xs dark:text-blue-300">
                              {((item.value / totalVisitors) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full flex items-center justify-center">
              <p className="text-gray-500 text-center dark:text-blue-300">
                <span className="block text-4xl mb-2 text-purple-300 dark:text-blue-200">🌎</span>
                No country data available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}