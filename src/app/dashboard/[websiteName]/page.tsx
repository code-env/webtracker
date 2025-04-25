'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart as BarChartIcon, PieChart as PieChartIcon, Globe, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
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
    id: string;
    route: string;
    pageVisits: number;
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
    }, [websiteName]);
    
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
            .sort((a: RouteAnalytics, b: RouteAnalytics) => b.visitors - a.visitors)
            .slice(0, 5)
            .map((route: RouteAnalytics) => ({
                page: route.route,
                views: route.visitors
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
        return analyticsData?.analytics?.totalPageVisits || 0;
    };
    
    // Calculate unique visitors
    const calculateUniqueVisitors = (): number => {
        if (!analyticsData?.analytics?.visitHistory) return 0;
        return analyticsData?.analytics?.totalVisitors || 0;
    };
    
    const trafficSourcesData: PieChartData[] = formatSourceData();
    const topPagesData: BarChartData[] = formatRouteData();
    const countryData: CountryChartData[] = formatCountryData();
    const deviceData: PieChartData[] = formatDeviceData();
    const referrerData: OsChartData[] = formatOSData();
    
    // Enhanced color palette
    const COLORS = {
        blue: ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
        green: ['#065f46', '#047857', '#059669', '#10b981', '#34d399'],
        amber: ['#92400e', '#b45309', '#d97706', '#f59e0b', '#fbbf24'],
        purple: ['#5b21b6', '#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa']
    };

    // Custom tooltip styles
    const CustomTooltip = ({ active, payload, label }: {
        active?: boolean;
        payload?: Array<{name: string; value: number}>;
        label?: string;
    }) => {
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

    // Skeleton component for loading state
    const CardSkeleton = () => (
        <Card className="shadow-md border-0">
            <CardHeader className="py-2 px-4">
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="py-2 px-4">
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
            </CardContent>
        </Card>
    );

    const ChartSkeleton = () => (
        <Card className="shadow-md border-0">
            <CardHeader className="py-2 px-4">
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="p-2">
                <Skeleton className="h-64 w-full rounded-lg" />
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-2 sm:p-6 overflow-hidden mb-3">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <Link href="/dashboard">
                        <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full text-sm px-4 py-2 flex items-center shadow-md">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2 flex items-center">
                        <Globe className="h-7 w-7 mr-3 text-blue-500" />
                        Analytics for {websiteName}
                    </h1>
                    <p className="text-gray-600">View detailed analytics and insights for your website</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                                <CardHeader className="pb-2 px-4">
                                    <CardTitle className="text-lg flex items-center text-blue-700">
                                        <BarChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                                        Total Page Views
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-4">
                                    <div className="text-3xl font-bold text-blue-600">{calculateTotalPageViews().toLocaleString()}</div>
                                    <div className="text-sm text-blue-500 font-medium mt-1">Analytics since project creation</div>
                                </CardContent>
                            </Card>
                            
                            <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                                <CardHeader className="pb-2 px-4">
                                    <CardTitle className="text-lg flex items-center text-blue-700">
                                        <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                                        Total Visitors
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-4">
                                    <div className="text-3xl font-bold text-blue-600">{calculateUniqueVisitors().toLocaleString()}</div>
                                    <div className="text-sm text-blue-500 font-medium mt-1">Analytics since project creation</div>
                                </CardContent>
                            </Card>
                            
                            <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                                <CardHeader className="pb-2 px-4">
                                    <CardTitle className="text-lg flex items-center text-blue-700">
                                        <Globe className="h-5 w-5 mr-2 text-blue-500" />
                                        Audience Reach
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-4">
                                    <div className="text-3xl font-bold text-blue-600">{countryData.length > 0 ? countryData.length.toLocaleString() : 0} Countries</div>
                                    <div className="text-sm text-blue-500 font-medium mt-1">Global audience distribution</div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {loading ? (
                        <>
                            <ChartSkeleton />
                            <ChartSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md border-0 overflow-hidden">
                                <CardHeader className="pb-2 px-4 border-b">
                                    <CardTitle className="text-lg flex items-center text-blue-700">
                                        <Globe className="h-5 w-5 mr-2 text-blue-500" />
                                        Traffic Sources
                                    </CardTitle>
                                    <CardDescription>Where your visitors are coming from</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="h-72">
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
                                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {trafficSourcesData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS.blue[index % COLORS.blue.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                                                </PieChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500 text-center">
                                                        <span className="block text-4xl mb-2 text-blue-300">📊</span>
                                                        No traffic source data available
                                                    </p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                            
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
                                                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
                        </>
                    )}
                </div>
                
                {loading ? (
                    <ChartSkeleton />
                ) : (
                    <Card className="shadow-md border-0 overflow-hidden mb-6">
                        <CardHeader className="pb-2 px-4 border-b">
                            <CardTitle className="text-lg flex items-center text-blue-700">
                                <BarChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Top Pages
                            </CardTitle>
                            <CardDescription>Your most visited pages</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    {topPagesData.length > 0 ? (
                                        <BarChart data={topPagesData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis type="number" tick={{ fontSize: 12 }} />
                                            <YAxis 
                                                dataKey="page" 
                                                type="category" 
                                                width={120} 
                                                tick={{ fontSize: 12 }}
                                                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 12)}...` : value}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar 
                                                dataKey="views" 
                                                fill="#3b82f6" 
                                                radius={[0, 4, 4, 0]}
                                                barSize={30}
                                            />
                                        </BarChart>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                            <p className="text-gray-500 text-center">
                                                <span className="block text-4xl mb-2 text-blue-300">📄</span>
                                                No page data available
                                            </p>
                                        </div>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {loading ? (
                        <>
                            <ChartSkeleton />
                            <ChartSkeleton />
                        </>
                    ) : (
                        <>
                            <Card className="shadow-md border-0 overflow-hidden">
                                <CardHeader className="pb-2 px-4 border-b">
                                    <CardTitle className="text-lg flex items-center text-blue-700">
                                        <Globe className="h-5 w-5 mr-2 text-blue-500" />
                                        Top Countries
                                    </CardTitle>
                                    <CardDescription>Visitor distribution by country</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {countryData.length > 0 ? (
                                                <BarChart data={countryData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis type="number" tick={{ fontSize: 12 }} />
                                                    <YAxis 
                                                        dataKey="country" 
                                                        type="category" 
                                                        width={100} 
                                                        tick={{ fontSize: 12 }}
                                                    />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Bar 
                                                        dataKey="visitors" 
                                                        fill="#6d28d9" 
                                                        radius={[0, 4, 4, 0]}
                                                        barSize={30}
                                                    />
                                                </BarChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500 text-center">
                                                        <span className="block text-4xl mb-2 text-purple-300">🌎</span>
                                                        No country data available
                                                    </p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md border-0 overflow-hidden">
                                <CardHeader className="pb-2 px-4 border-b">
                                    <CardTitle className="text-lg flex items-center text-blue-700">
                                        <Monitor className="h-5 w-5 mr-2 text-blue-500" />
                                        Top Operating Systems
                                    </CardTitle>
                                    <CardDescription>What systems your visitors use</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {referrerData.length > 0 ? (
                                                <BarChart data={referrerData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis 
                                                        dataKey="site" 
                                                        tick={{ fontSize: 12 }} 
                                                        padding={{ left: 10, right: 10 }}
                                                    />
                                                    <YAxis tick={{ fontSize: 12 }} />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Bar 
                                                        dataKey="visits" 
                                                        fill="#f59e0b" 
                                                        radius={[4, 4, 0, 0]}
                                                        barSize={40}
                                                    />
                                                </BarChart>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <p className="text-gray-500 text-center">
                                                        <span className="block text-4xl mb-2 text-amber-300">💻</span>
                                                        No OS data available
                                                    </p>
                                                </div>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}