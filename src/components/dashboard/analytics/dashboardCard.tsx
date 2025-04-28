import { BarChart as BarChartIcon, PieChart as PieChartIcon, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CountryAnalytics {
  countryCode: string;
  countryName: string;
  visitors: number;
}

interface Visit {
    timestamp: string;
    visitorId: string;
    sessionId?: string;
    url?: string;
  }

interface Analytics {
  visitHistory: Visit[];
  countryAnalytics: CountryAnalytics[];
  totalPageVisits?: number;
  totalVisitors?: number;
}

interface AnalyticsData {
  analytics: Analytics;
}

export default function DashboardCards({ analyticsData }: { analyticsData: AnalyticsData }) {
  // Calculate total page views
  const calculateTotalPageViews = (): number => {
    if (!analyticsData?.analytics?.visitHistory) return 0;
    return analyticsData?.analytics?.totalPageVisits || 0;
  };

  // Calculate unique visitors
  const calculateUniqueVisitors = (): number => {
    if (!analyticsData?.analytics?.visitHistory) return 0;
    return analyticsData?.analytics?.totalVisitors || 0;
  };

  // Get countries count
  const countryCount = analyticsData?.analytics?.countryAnalytics?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
            <BarChartIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
            Total Page Views
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-200">
            {calculateTotalPageViews().toLocaleString()}
          </div>
          <div className="text-sm text-blue-500 font-medium mt-1 dark:text-blue-300">
            Analytics since project creation
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
            <PieChartIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
            Total Visitors
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-200">
            {calculateUniqueVisitors().toLocaleString()}
          </div>
          <div className="text-sm text-blue-500 font-medium mt-1 dark:text-blue-300">
            Analytics since project creation
          </div>
        </CardContent>
      </Card>

      <Card className="border border-blue-200 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
            <Globe className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
            Audience Reach
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-200">
            {countryCount > 0 ? countryCount.toLocaleString() : 0} Countries
          </div>
          <div className="text-sm text-blue-500 font-medium mt-1 dark:text-blue-300">
            Global audience distribution
          </div>
        </CardContent>
      </Card>
    </div>
  );
}