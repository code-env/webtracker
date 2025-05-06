'use client'

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas-pro';
import { AnalyticsData, COLORS } from "@/lib/types";
import { countryMap } from '@/lib/fullCountryMap';
import Image from 'next/image';

interface AnalyticsSummaryDownloadProps {
  analyticsData: AnalyticsData | null;
  domain: string;
}

// Helper function to get country codes for flags
const getCountryCode = (countryName: string): string => {
  return countryMap[countryName] || "un";
};

// Helper function to format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
};

// Helper to truncate long page URLs
const truncateUrl = (url: string, maxLength: number = 25): string => {
  if (url === "/") return "Home";
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + '...';
};

const AnalyticsSummaryDownload = ({ analyticsData, domain }: AnalyticsSummaryDownloadProps) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  const downloadAnalyticsSummary = async () => {
    if (!summaryRef.current) return;
    
    try {
      const canvas = await html2canvas(summaryRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${domain}-analytics-summary.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Failed to generate analytics image:', error);
    }
  };

  if (!analyticsData) return null;
  
  const { analytics } = analyticsData;
  const pageViews = analyticsData.analytics.totalPageVisits || 0;
  const uniqueVisitors = analyticsData.analytics.totalVisitors || 0;
  const allTimeVisitors = uniqueVisitors;
  
  // Sort all analytics data in descending order
  const sortedSourceAnalytics = [...(analytics.sourceAnalytics || [])].sort((a, b) => b.visitors - a.visitors);
  const sortedRouteAnalytics = [...(analytics.routeAnalytics || [])].sort((a, b) => b.pageVisits - a.pageVisits);
  const sortedCountryAnalytics = [...(analytics.countryAnalytics || [])].sort((a, b) => b.visitors - a.visitors);
  const sortedDeviceAnalytics = [...(analytics.deviceAnalytics || [])].sort((a, b) => b.visitors - a.visitors);
  const sortedOsAnalytics = [...(analytics.osAnalytics || [])].sort((a, b) => b.visitors - a.visitors);
  
  // Get today's date formatted nicely
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <>
      <Button 
        onClick={downloadAnalyticsSummary}
        variant="outline" 
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 border-none"
      >
        <Download className="h-4 w-4" />
        Download Analytics Summary
      </Button>
      
      {/* Hidden div that will be rendered to an image */}
      <div className="fixed left-[-9999px]" ref={summaryRef}>
        <div className="w-[1200px] h-[900px] p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-zinc-800 dark:to-zinc-900 rounded-xl border border-blue-200 dark:border-zinc-700 overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute right-40 bottom-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-900 rounded-full opacity-10 blur-xl"></div>
          
          <div className="flex flex-col h-full relative z-10">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                  Analytics Summary for {domain}
                </h1>
                <div className="bg-white/60 dark:bg-zinc-800/60 px-4 py-1 rounded-lg shadow-sm backdrop-blur-sm border border-blue-100 dark:border-blue-900/30">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Generated on {today}
                  </p>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            
            {/* Main metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Total Page Views</h3>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(pageViews)}</p>
              </div>
             
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">All-Time Visitors</h3>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(allTimeVisitors)}</p>
              </div>
            </div>
            
            {/* Detailed metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Top 5 Traffic Sources</h3>
                <div className="space-y-2">
                  {sortedSourceAnalytics.slice(0, 5).map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS.blue[index % COLORS.blue.length] }}></div>
                        <span className="text-base text-gray-600 dark:text-gray-300">{source.sourceName || "Direct"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-base font-medium text-blue-600 dark:text-blue-400 mr-2">{formatNumber(source.visitors)}</span>
                        <div className="w-14 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400" 
                            style={{ 
                              width: `${Math.min(100, (source.visitors / 
                                (sortedSourceAnalytics[0]?.visitors || 1)) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Top 5 Pages</h3>
                <div className="space-y-2">
                  {sortedRouteAnalytics.slice(0, 5).map((route, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS.green[index % COLORS.green.length] }}></div>
                        <span className="text-base text-gray-600 dark:text-gray-300 truncate max-w-[70%]">
                          {truncateUrl(route.route)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-base font-medium text-green-600 dark:text-green-400 mr-2">{formatNumber(route.pageVisits)}</span>
                        <div className="w-14 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-400" 
                            style={{ 
                              width: `${Math.min(100, (route.pageVisits / 
                                (sortedRouteAnalytics[0]?.pageVisits || 1)) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Top 5 Countries</h3>
                <div className="space-y-2">
                  {sortedCountryAnalytics.slice(0, 5).map((country, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                          <Image
                            width={20}
                            height={20} 
                            src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(country.countryName).toLowerCase()}.svg`}
                            alt={country.countryName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-base text-gray-600 dark:text-gray-300">{country.countryName}</span>
                      </div>
                      <span className="text-base font-medium text-purple-600 dark:text-purple-400">{formatNumber(country.visitors)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Top 2 Devices</h3>
                <div className="space-y-2">
                  {sortedDeviceAnalytics.slice(0, 5).map((device, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS.amber[index % COLORS.amber.length] }}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{device.deviceType}</span>
                      </div>
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{formatNumber(device.visitors)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/90 dark:bg-zinc-800/90 p-4 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Top 5 Operating Systems</h3>
                <div className="space-y-2">
                  {sortedOsAnalytics.slice(0, 5).map((os, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS.indigo[index % COLORS.indigo.length] }}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{os.osName}</span>
                      </div>
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{formatNumber(os.visitors)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-auto pt-4 border-t border-blue-100 dark:border-zinc-700">
              <p className='text-blue-500'>Powered by WebTracker</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsSummaryDownload;