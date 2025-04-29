'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { countryNames } from "@/lib/utils";

// Add this to your package.json:
// "react-simple-maps": "^3.0.0",
// "d3-scale": "^4.0.2"

// You'll need to download a world map GeoJSON file
// This is a low-resolution example - place this in your public folder
const geoUrl = "/topoworld.json";

interface WorldMapProps {
  countryData: {
    countryCode: string;
    countryName: string;
    visitors: number;
  }[];
  isLoading: boolean;
}

const WorldMap = ({ countryData, isLoading }: WorldMapProps) => {
  const [activeCountry, setActiveCountry] = React.useState<{
    name: string;
    value: number;
  } | null>(null);



  // Process the country data for mapping
  const dataMap = new Map();
  countryData.forEach((item) => {
    // Ensure country codes are uppercase for consistent matching
    const countryCode = item.countryCode.toUpperCase();
    dataMap.set(countryCode, {
      name: item.countryName,
      value: item.visitors
    });
  });


  
  // Create color scale based on visitor numbers
  const colorScale = scaleQuantile<string>()
    .domain(countryData.length > 0 ? countryData.map(d => d.visitors) : [0])
    .range([
      "#cfe2ff", // lightest blue
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#1d4ed8"  // darkest blue
    ]);
  
  // Create a reverse mapping from country names to country codes
  const countryNameToCode = Object.entries(countryNames).reduce((acc, [code, name]) => {
    acc[name.toLowerCase()] = code;
    return acc;
  }, {} as Record<string, string>);
  
  return (
    <Card className="shadow-md border-0 overflow-hidden dark:bg-zinc-900 dark:text-blue-100">
      <CardHeader className="pb-2 px-4 border-b dark:border-zinc-800">
        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-200">
          <Globe className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
          Visitor World Map
        </CardTitle>
        <CardDescription className="dark:text-blue-200">Geographic distribution of your visitors</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-96">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-blue-200">Loading map data...</p>
            </div>
          ) : countryData.length > 0 ? (
            <TooltipProvider>
              <ComposableMap
                projectionConfig={{ scale: 155 }}
                width={800}
                height={400}
                style={{ width: "100%", height: "100%" }}
              >
                <ZoomableGroup>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
  
                      geographies.map(geo => {
                        // If no ISO code found, try to map from country name
                        const countryCode =  (geo.properties.name && countryNameToCode[geo.properties.name.toLowerCase()]);
                        
                        // Find matching country data
                        const current = countryCode ? dataMap.get(countryCode) : null;
                        
                        return (
                          <Tooltip key={geo.rsmKey}>
                            <TooltipTrigger asChild>
                              <Geography
                                geography={geo}
                                fill={current ? colorScale(current.value) : "#EEE"}
                                stroke="#D6D6DA"
                                strokeWidth={0.5}
                                onMouseEnter={() => {
                                  // Use different property names for country name
                                  const countryName = 
                                    geo.properties.NAME || 
                                    geo.properties.name || 
                                    geo.properties.ADMIN ||
                                    countryNames[countryCode as keyof typeof countryNames] ||
                                    "Unknown";
                                    
                                  setActiveCountry(current 
                                    ? { name: countryName, value: current.value }
                                    : { name: countryName, value: 0 });
                                }}
                                onMouseLeave={() => {
                                  setActiveCountry(null);
                                }}
                                style={{
                                  default: { outline: "none" },
                                  hover: { 
                                    fill: current ? "#2563eb" : "#F5F5F5", 
                                    outline: "none",
                                    cursor: "pointer" 
                                  },
                                  pressed: { outline: "none" },
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              {activeCountry?.name}:  {(activeCountry?.value ?? 0) > 0 
                                ? `${activeCountry?.value.toLocaleString()} visitors` 
                                : "No visitors"}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </TooltipProvider>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-500 text-center dark:text-blue-200">
                <span className="block text-4xl mb-2 text-blue-300 dark:text-blue-500">🗺️</span>
                No country data available for map visualization
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMap;