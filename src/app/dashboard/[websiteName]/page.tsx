'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage({ params }: { params: Promise<{ websiteName: string }> }) {
    
    const resolvedParams = React.use(params);
    const websiteName = resolvedParams?.websiteName || 'example.com';
    const [dateRange, setDateRange] = useState('week');
    const pageViewData = [
        { date: 'Mon', views: 4000, uniqueVisitors: 2400 },
        { date: 'Tue', views: 3000, uniqueVisitors: 1398 },
        { date: 'Wed', views: 2000, uniqueVisitors: 9800 },
        { date: 'Thu', views: 2780, uniqueVisitors: 3908 },
        { date: 'Fri', views: 1890, uniqueVisitors: 4800 },
        { date: 'Sat', views: 2390, uniqueVisitors: 3800 },
        { date: 'Sun', views: 3490, uniqueVisitors: 4300 },
    ];
    
    const bounceRateData = [
        { date: 'Mon', rate: 45 },
        { date: 'Tue', rate: 38 },
        { date: 'Wed', rate: 52 },
        { date: 'Thu', rate: 40 },
        { date: 'Fri', rate: 35 },
        { date: 'Sat', rate: 42 },
        { date: 'Sun', rate: 47 },
    ];
      
    const trafficSourcesData = [
        { name: 'Direct', value: 400 },
        { name: 'Search', value: 300 },
        { name: 'Social', value: 300 },
        { name: 'Referral', value: 200 },
        { name: 'Email', value: 100 },
    ];
      
    const userSessionData = [
        { time: '9AM', activeSessions: 40 },
        { time: '10AM', activeSessions: 70 },
        { time: '11AM', activeSessions: 105 },
        { time: '12PM', activeSessions: 120 },
        { time: '1PM', activeSessions: 90 },
        { time: '2PM', activeSessions: 75 },
        { time: '3PM', activeSessions: 60 },
        { time: '4PM', activeSessions: 80 },
        { time: '5PM', activeSessions: 45 },
    ];
      
    const topPagesData = [
        { page: '/home', views: 1200 },
        { page: '/products', views: 980 },
        { page: '/about', views: 780 },
        { page: '/contact', views: 690 },
        { page: '/blog', views: 590 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const countryData = [
        { country: 'United States', visitors: 2500 },
        { country: 'United Kingdom', visitors: 1800 },
        { country: 'Germany', visitors: 1400 },
        { country: 'France', visitors: 1200 },
        { country: 'India', visitors: 1000 },
    ];

    const referrerData = [
        { site: 'Google', visits: 3500 },
        { site: 'Facebook', visits: 2800 },
        { site: 'Twitter', visits: 1900 },
        { site: 'LinkedIn', visits: 1500 },
        { site: 'GitHub', visits: 1200 },
    ];

    const deviceData = [
        { name: 'Desktop', value: 580 },
        { name: 'Mobile', value: 480 },
        { name: 'Tablet', value: 140 },
    ];

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
                    <Select value={dateRange} onValueChange={setDateRange}>
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
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:pb-2 sm:px-4">
                            <CardTitle className="text-sm sm:text-lg">Total Page Views</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-3 sm:px-4">
                            <div className="text-xl sm:text-3xl font-bold text-blue-500">17,550</div>
                            <div className="text-xs sm:text-sm text-green-500">+12.5% from last week</div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:pb-2 sm:px-4">
                            <CardTitle className="text-sm sm:text-lg">Unique Visitors</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-3 sm:px-4">
                            <div className="text-xl sm:text-3xl font-bold text-blue-500">8,604</div>
                            <div className="text-xs sm:text-sm text-green-500">+5.2% from last week</div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:pb-2 sm:px-4">
                            <CardTitle className="text-sm sm:text-lg">Avg. Session Duration</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-3 sm:px-4">
                            <div className="text-xl sm:text-3xl font-bold text-blue-500">3m 42s</div>
                            <div className="text-xs sm:text-sm text-red-500">-1.3% from last week</div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Page Views & Unique Visitors</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={pageViewData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                                        <Line type="monotone" dataKey="views" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 6 }} />
                                        <Line type="monotone" dataKey="uniqueVisitors" stroke="#00C49F" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Bounce Rate</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={bounceRateData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="rate" stroke="#FF8042" fill="#FF8042" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Traffic Sources</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
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
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Active Sessions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={userSessionData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="activeSessions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <Card className="shadow-md mb-3 sm:mb-6">
                    <CardHeader className="py-2 px-3 sm:px-4">
                        <CardTitle className="text-sm sm:text-base">Top Pages</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-2">
                        <div className="h-40 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topPagesData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" tick={{ fontSize: 10 }} />
                                    <YAxis dataKey="page" type="category" width={60} tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="views" fill="#0088FE" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Top Countries</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" tick={{ fontSize: 10 }} />
                                        <YAxis dataKey="country" type="category" width={60} tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Bar dataKey="visitors" fill="#1d4ed8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Top Referrers</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={referrerData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="site" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Bar dataKey="visits" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                    <Card className="shadow-md">
                        <CardHeader className="py-2 px-3 sm:px-4">
                            <CardTitle className="text-sm sm:text-base">Device Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-2">
                            <div className="h-48 sm:h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
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
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}