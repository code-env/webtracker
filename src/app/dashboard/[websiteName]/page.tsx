'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage({ params }: { params: { websiteName: string } }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const resolvedParams = React.use(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard">
            <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button 
              variant={dateRange === 'day' ? 'default' : 'outline'} 
              onClick={() => setDateRange('day')}
              className={dateRange === 'day' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-blue-500 text-blue-500 hover:bg-blue-100'}
            >
              Day
            </Button>
            <Button 
              variant={dateRange === 'week' ? 'default' : 'outline'} 
              onClick={() => setDateRange('week')}
              className={dateRange === 'week' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-blue-500 text-blue-500 hover:bg-blue-100'}
            >
              Week
            </Button>
            <Button 
              variant={dateRange === 'month' ? 'default' : 'outline'} 
              onClick={() => setDateRange('month')}
              className={dateRange === 'month' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-blue-500 text-blue-500 hover:bg-blue-100'}
            >
              Month
            </Button>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Analytics for {websiteName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">17,550</div>
              <div className="text-sm text-green-500">+12.5% from last week</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">8,604</div>
              <div className="text-sm text-green-500">+5.2% from last week</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Session Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">3m 42s</div>
              <div className="text-sm text-red-500">-1.3% from last week</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Page Views & Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pageViewData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uniqueVisitors" stroke="#00C49F" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bounceRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="#FF8042" fill="#FF8042" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourcesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userSessionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="activeSessions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPagesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="page" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Top Countries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={countryData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="country" type="category" width={100} />
                                        <Tooltip />
                                        <Bar dataKey="visitors" fill="#1d4ed8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Top Referrers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={referrerData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="site" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="visits" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Device Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
      </div>
    </div>
    )
}