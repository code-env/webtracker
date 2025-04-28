import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PerformanceAnalytics {
  domReady: number;
  id: number;
  loadTime: number;
  networkLatency: number;
  processingTime: number;
  totalTime: number;
}

interface Analytics {
  performanceAnalytics: PerformanceAnalytics[];
}

interface AnalyticsData {
  analytics: Analytics;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  color: string;
}

export default function PerformanceMetricsCard({ analyticsData }: { analyticsData: AnalyticsData }) {
  // Calculate performance metrics averages
  const calculatePerformanceMetrics = (): PerformanceMetric[] => {
    if (!analyticsData?.analytics?.performanceAnalytics?.length) return [];

    const perfData = analyticsData.analytics.performanceAnalytics;

    // Calculate averages
    const totalCount = perfData.length;
    const totalTimes = perfData.reduce(
      (acc, curr) => {
        return {
          domReady: acc.domReady + curr.domReady,
          loadTime: acc.loadTime + curr.loadTime,
          networkLatency: acc.networkLatency + curr.networkLatency,
          processingTime: acc.processingTime + curr.processingTime,
          totalTime: acc.totalTime + curr.totalTime,
        };
      },
      {
        domReady: 0,
        loadTime: 0,
        networkLatency: 0,
        processingTime: 0,
        totalTime: 0,
      }
    );

    return [
      {
        name: "Page Load",
        value: Math.round((totalTimes.loadTime / totalCount) * 100) / 100,
        unit: "ms",
        color: "bg-blue-500",
      },
      {
        name: "DOM Ready",
        value: Math.round((totalTimes.domReady / totalCount) * 100) / 100,
        unit: "ms",
        color: "bg-green-500",
      },
      {
        name: "Network Latency",
        value: Math.round((totalTimes.networkLatency / totalCount) * 100) / 100,
        unit: "ms",
        color: "bg-amber-500",
      },
      {
        name: "Processing Time",
        value: Math.round((totalTimes.processingTime / totalCount) * 100) / 100,
        unit: "ms",
        color: "bg-purple-500",
      },
    ];
  };

  const performanceMetrics = calculatePerformanceMetrics();

  return (
    <Card className="shadow-md border border-blue-200 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
      <CardHeader className="pb-2 px-4 border-b">
        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
          <Clock className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
          Performance Metrics
        </CardTitle>
        <CardDescription className="dark:text-blue-200">Average page load performance</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72 flex flex-col justify-center">
          {performanceMetrics.length > 0 ? (
            <div className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium dark:text-blue-200">
                      {metric.name}
                    </span>
                    <span className="text-blue-600 font-bold dark:text-blue-200">
                      {metric.value} {metric.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-zinc-800">
                    <div
                      className={`${metric.color} h-2.5 rounded-full`}
                      style={{
                        width: `${Math.min(100, (metric.value / 1000) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 dark:text-blue-300">
                    {metric.name === "Page Load" &&
                      "Total time to fully load the page"}
                    {metric.name === "DOM Ready" &&
                      "Time until DOM is ready to use"}
                    {metric.name === "Network Latency" &&
                      "Time for network requests"}
                    {metric.name === "Processing Time" &&
                      "Time for browser to process content"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-500 text-center dark:text-blue-300">
                <span className="block text-4xl mb-2 text-blue-300 dark:text-blue-200">⏱️</span>
                No performance data available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}