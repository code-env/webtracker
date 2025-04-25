'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { getDomainAnalytics } from "@/app/actions/db_calls";
import { Skeleton } from "@/components/ui/skeleton";

// Define interfaces for type safety
interface Visit {
    timestamp: string;
    visitorId: string;
    sessionId?: string;
    url?: string;
}

interface RouteAnalytics {
    routePath: string;
    visits: number;
    visitors: number;
}

interface SourceAnalytics {
    sourceName: string;
    visitors: number;
}

interface CountryAnalytics {
    countryCode: string;
    countryName: string;
    visitors: number;
}

interface DeviceAnalytics {
    deviceType: string;
    visitors: number;
}

interface OsAnalytics {
    osName: string;
    visitors: number;
}

interface Analytics {
    visitHistory: Visit[];
    routeAnalytics: RouteAnalytics[];
    sourceAnalytics: SourceAnalytics[];
    countryAnalytics: CountryAnalytics[];
    deviceAnalytics: DeviceAnalytics[];
    osAnalytics: OsAnalytics[];
    totalPageVisits?: number;
    totalVisitors?: number;
}

interface AnalyticsData {
    analytics: Analytics;
    success?: boolean;
    message?: string;
}

// Chart data interfaces
interface PageViewChartData {
    date: string;
    views: number;
    uniqueVisitors: number;
}

interface PieChartData {
    name: string;
    value: number;
}

interface BarChartData {
    page: string;
    views: number;
}

interface CountryChartData {
    country: string;
    visitors: number;
}

interface OsChartData {
    site: string;
    visits: number;
}

export default function DashboardPage({ params }: { params: Promise<{ websiteName: string }> }) {
    
    const resolvedParams = React.use(params);
    const websiteName = resolvedParams?.websiteName || 'example.com';
    const [dateRange, setDateRange] = useState<'day' | 'week' | 'month'>('week');
    const [loading, setLoading] = useState<boolean>(true);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null | undefined>(null);
    
    useEffect(() => {
        const fetchAnalyticsData = async () => {
            setLoading(true);
            try {
                const data = await getDomainAnalytics(websiteName);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                setAnalyticsData(data);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchAnalyticsData();
    }, [websiteName, dateRange]);
    
    // Format visit history data for page views chart
    const formatVisitHistoryData = (): PageViewChartData[] => {
        if (!analyticsData?.analytics?.visitHistory?.length) return [];
        
        const history = analyticsData.analytics.visitHistory;
        
        interface GroupedVisits {
            [key: string]: {
                date: string;
                views: number;
                uniqueVisitors: Set<string>;
            }
        }
        
        // Group by date and count views and unique visitors
        const groupedData = history.reduce((acc: GroupedVisits, visit: Visit) => {
            const date = new Date(visit.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
            if (!acc[date]) {
                acc[date] = { date, views: 0, uniqueVisitors: new Set() };
            }
            acc[date].views++;
            acc[date].uniqueVisitors.add(visit.visitorId);
            return acc;
        }, {});
        
        // Convert to array and format for chart
        return Object.values(groupedData).map((item) => ({
            date: item.date,
            views: item.views,
            uniqueVisitors: item.uniqueVisitors.size
        }));
    };
    
    // Format source analytics data for pie chart
    const formatSourceData = (): PieChartData[] => {
        if (!analyticsData?.analytics?.sourceAnalytics?.length) return [];
        
        return analyticsData.analytics.sourceAnalytics.map((source: SourceAnalytics) => ({
            name: source.sourceName,
            value: source.visitors
        }));
    };
    
    // Format route analytics data for bar chart
    const formatRouteData = (): BarChartData[] => {
        if (!analyticsData?.analytics?.routeAnalytics?.length) return [];
        
        return analyticsData.analytics.routeAnalytics
            .sort((a: RouteAnalytics, b: RouteAnalytics) => b.visits - a.visits)
            .slice(0, 5)
            .map((route: RouteAnalytics) => ({
                page: route.routePath,
                views: route.visits
            }));
    };
    
    // Format country analytics data
    const formatCountryData = (): CountryChartData[] => {
        if (!analyticsData?.analytics?.countryAnalytics?.length) return [];
        
        return analyticsData.analytics.countryAnalytics
            .sort((a: CountryAnalytics, b: CountryAnalytics) => b.visitors - a.visitors)
            .slice(0, 5)
            .map((country: CountryAnalytics) => ({
                country: country.countryName,
                visitors: country.visitors
            }));
    };
    
    // Format device analytics data
    const formatDeviceData = (): PieChartData[] => {
        if (!analyticsData?.analytics?.deviceAnalytics?.length) return [];
        
        return analyticsData.analytics.deviceAnalytics.map((device: DeviceAnalytics) => ({
            name: device.deviceType,
            value: device.visitors
        }));
    };
    
    // Format OS analytics data for a chart
    const formatOSData = (): OsChartData[] => {
        if (!analyticsData?.analytics?.osAnalytics?.length) return [];
        
        return analyticsData.analytics.osAnalytics
            .sort((a: OsAnalytics, b: OsAnalytics) => b.visitors - a.visitors)
            .slice(0, 5)
            .map((os: OsAnalytics) => ({
                site: os.osName,
                visits: os.visitors
            }));
    };
    
    // Calculate total page views
    const calculateTotalPageViews = (): number => {
        if (!analyticsData?.analytics?.visitHistory) return 0;
        return analyticsData.analytics.visitHistory.length;
    };
    
    // Calculate unique visitors
    const calculateUniqueVisitors = (): number => {
        if (!analyticsData?.analytics?.visitHistory) return 0;
        const uniqueVisitors = new Set(
            analyticsData.analytics.visitHistory.map((visit: Visit) => visit.visitorId)
        );
        return uniqueVisitors.size;
    };
    
    
    
    const pageViewData: PageViewChartData[] = formatVisitHistoryData();
    const trafficSourcesData: PieChartData[] = formatSourceData();
    const topPagesData: BarChartData[] = formatRouteData();
    const countryData: CountryChartData[] = formatCountryData();
    const deviceData: PieChartData[] = formatDeviceData();
    const referrerData: OsChartData[] = formatOSData();
    
    const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    // Skeleton component for loading state
    const CardSkeleton = () => (
        <Card className="shadow-md">
            <CardHeader className="py-2 px-3 sm:pb-2 sm:px-4">
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="py-2 px-3 sm:px-4">
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
            </CardContent>
        </Card>
    );

    const ChartSkeleton = () => (
        <Card className="shadow-md">
            <CardHeader className="py-2 px-3 sm:px-4">
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="p-0 sm:p-2">
                <Skeleton className="h-48 sm:h-64 md:h-80 w-full" />
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-white p-1 sm:p-4 overflow-hidden mb-3">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <Link href="/dashboard">
                        <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600 text-xs sm:text-sm">
                            <ArrowLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <Select value={dateRange} onValueChange={(value) => setDateRange(value as "day" | "week" | "month")}>
                      <SelectTrigger className="w-28 sm:w-36 md:w-48 border border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[10px] sm:text-xs md:text-sm">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-blue-200 text-[10px] sm:text-xs md:text-sm">
                        <SelectItem value="day" className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer">Day</SelectItem>
                        <SelectItem value="week" className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer">Week</SelectItem>
                        <SelectItem value="month" className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer">Month</SelectItem>
                      </SelectContent>
                    </Select>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-3 sm:mb-6 truncate">Analytics for {websiteName}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-6">
                    {loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md">
                                <CardHeader className="py-2 px-3 sm:pb-2 sm:px-4">
                                    <CardTitle className="text-sm sm:text-lg">Total Page Views</CardTitle>
                                </CardHeader>
                                <CardContent className="py-2 px-3 sm:px-4">
                                    <div className="text-xl sm:text-3xl font-bold text-blue-500">{calculateTotalPageViews()}</div>
                                    <div className="text-xs sm:text-sm text-green-500">Analytics since project creation</div>
                                </CardContent>
                            </Card>
                            
                            <Card className="shadow-md">
                                <CardHeader className="py-2 px-3 sm:pb-2 sm:px-4">
                                    <CardTitle className="text-sm sm:text-lg">Unique Visitors</CardTitle>
                                </CardHeader>
                                <CardContent className="py-2 px-3 sm:px-4">
                                    <div className="text-xl sm:text-3xl font-bold text-blue-500">{calculateUniqueVisitors()}</div>
                                    <div className="text-xs sm:text-sm text-green-500">Analytics since project creation</div>
                                </CardContent>
                            </Card>
                            
                            
                        </>
                    )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    {loading ? (
                        <>
                            <ChartSkeleton />
                            <ChartSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md">
                                <CardHeader className="py-2 px-3 sm:px-4">
                                    <CardTitle className="text-sm sm:text-base">Page Views & Unique Visitors</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 sm:p-2">
                                    <div className="h-48 sm:h-64 md:h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {pageViewData.length > 0 ? (
                                                <LineChart data={pageViewData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                                    <YAxis tick={{ fontSize: 10 }} />
                                                    <Tooltip />
                                                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                                                    <Line type="monotone" dataKey="views" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 6 }} />
                                                    <Line type="monotone" dataKey="uniqueVisitors" stroke="#00C49F" strokeWidth={2} />
                                                </LineChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500">No page view data available</p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            
                        </>
                    )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    {loading ? (
                        <>
                            <ChartSkeleton />
                            <ChartSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md">
                                <CardHeader className="py-2 px-3 sm:px-4">
                                    <CardTitle className="text-sm sm:text-base">Traffic Sources</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 sm:p-2">
                                    <div className="h-48 sm:h-64 md:h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {trafficSourcesData.length > 0 ? (
                                                <PieChart>
                                                    <Pie
                                                        data={trafficSourcesData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius="70%"
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        label={({  percent }) => `${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {trafficSourcesData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                                                </PieChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500">No traffic source data available</p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            
                        </>
                    )}
                </div>
                
                {loading ? (
                    <ChartSkeleton />
                ) : (
                    <Card className="shadow-md mb-3 sm:mb-6">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Top Pages</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-40 sm:h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    {topPagesData.length > 0 ? (
                                        <BarChart data={topPagesData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" tick={{ fontSize: 10 }} />
                                            <YAxis dataKey="page" type="category" width={60} tick={{ fontSize: 10 }} />
                                            <Tooltip />
                                            <Bar dataKey="views" fill="#0088FE" />
                                        </BarChart>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                            <p className="text-gray-500">No page data available</p>
                                        </div>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    {loading ? (
                        <>
                            <ChartSkeleton />
                            <ChartSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md">
                                <CardHeader className="py-2 px-3 sm:px-4">
                                    <CardTitle className="text-sm sm:text-base">Top Countries</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 sm:p-2">
                                    <div className="h-48 sm:h-64 md:h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {countryData.length > 0 ? (
                                                <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis type="number" tick={{ fontSize: 10 }} />
                                                    <YAxis dataKey="country" type="category" width={60} tick={{ fontSize: 10 }} />
                                                    <Tooltip />
                                                    <Bar dataKey="visitors" fill="#1d4ed8" />
                                                </BarChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500">No country data available</p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader className="py-2 px-3 sm:px-4">
                                    <CardTitle className="text-sm sm:text-base">Top Operating Systems</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 sm:p-2">
                                    <div className="h-48 sm:h-64 md:h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {referrerData.length > 0 ? (
                                                <BarChart data={referrerData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="site" tick={{ fontSize: 10 }} />
                                                    <YAxis tick={{ fontSize: 10 }} />
                                                    <Tooltip />
                                                    <Bar dataKey="visits" fill="#3b82f6" />
                                                </BarChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500">No OS data available</p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    {loading ? (
                        <ChartSkeleton />
                    ) : (
                        <Card className="shadow-md">
                            <CardHeader className="py-2 px-3 sm:px-4">
                                <CardTitle className="text-sm sm:text-base">Device Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 sm:p-2">
                                <div className="h-48 sm:h-64 md:h-80">
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
                                                    {deviceData.map((entry, index: number) => (
                                                        <Cell 
                                                            key={`cell-${index}`} 
                                                            fill={[
                                                                '#2563eb',
                                                                '#3b82f6',
                                                                '#60a5fa'
                                                            ][index % 3]} 
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend wrapperStyle={{ fontSize: '10px' }} />
                                            </PieChart>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center">
                                                <p className="text-gray-500">No device data available</p>
                                            </div>
                                        )}
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}