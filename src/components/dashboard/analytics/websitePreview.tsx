import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Twitter, Globe, Linkedin } from "lucide-react";
import { ClientImage } from "../clientImage";
import { FaviconImage } from "../FaviconImage";
import { LinkMetadata } from "@/app/actions/actions";


interface WebsitePreviewProps {
  metadata: LinkMetadata;
  domain: string;
}

export default function WebsitePreview({ metadata, domain }: WebsitePreviewProps) {
  return (
    <div className="max-w-lg shadow-md border border-blue-200 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white mb-6 dark:bg-zinc-900 dark:from-zinc-900 dark:to-zinc-900 dark:border-zinc-800 dark:shadow-none">
      <div className="p-4 border-b border-blue-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-2 rounded-full dark:bg-blue-900/20">
            <Globe className="h-5 w-5 text-blue-500 dark:text-blue-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200">Website Preview</h2>
            <p className="text-sm text-blue-500 dark:text-blue-300">See how your website appears on different platforms</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full bg-blue-50 dark:bg-zinc-800 border-b border-blue-100 dark:border-zinc-700 p-1 rounded-none">
          <TabsTrigger value="general" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-300">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-300">
            <Facebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-300">
            <Twitter className="h-4 w-4" />
            <span className="hidden sm:inline">Twitter</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-300">
            <Linkedin className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </TabsTrigger>
        </TabsList>

        {/* General Preview */}
        <TabsContent value="general" className="p-4">
          <Card className="border border-blue-100 dark:border-zinc-700 overflow-hidden shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  {metadata.image ? (
                    <ClientImage
                      src={metadata.image}
                      alt={metadata.title || "Website Preview"}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Globe className="h-16 w-16 text-blue-200 dark:text-zinc-600" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-200">{metadata.title || "No title available"}</h3>
                <p className="text-blue-600 dark:text-blue-300 text-sm">
                  {metadata.description || "No description available"}
                </p>
              </div>
            </CardContent>
            
          </Card>
        </TabsContent>

        {/* Facebook Preview */}
        <TabsContent value="facebook" className="p-4">
          <Card className="border border-blue-100 dark:border-zinc-700 overflow-hidden shadow-sm">
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  {metadata.image ? (
                    <ClientImage
                      src={metadata.image}
                      alt={metadata.title || "Facebook Preview"}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Globe className="h-16 w-16 text-blue-200 dark:text-zinc-600" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {metadata.favicon && (
                    <div className="relative h-5 w-5 overflow-hidden rounded-sm">
                      <FaviconImage 
                        src={metadata.favicon}
                        alt="Favicon"
                      />
                    </div>
                  )}
                  <p className="text-xs text-blue-500 dark:text-blue-400">{metadata.siteName || domain}</p>
                </div>
                <h3 className="text-base font-semibold text-blue-700 dark:text-blue-200">{metadata.title || "No title available"}</h3>
                <p className="text-blue-600 dark:text-blue-300 text-xs">
                  {metadata.description || "No description available"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Twitter Preview */}
        <TabsContent value="twitter" className="p-4">
          <Card className="border border-blue-100 dark:border-zinc-700 overflow-hidden shadow-sm">
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  {(metadata.twitterImage || metadata.image) ? (
                    <ClientImage
                      src={metadata.twitterImage || metadata.image}
                      alt={metadata.twitterTitle || metadata.title || "Twitter Preview"}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Globe className="h-16 w-16 text-blue-200 dark:text-zinc-600" />
                    </div>
                  )}
                </div>
                <h3 className="text-base font-semibold text-blue-700 dark:text-blue-200">{metadata.twitterTitle || metadata.title || "No title available"}</h3>
                <p className="text-blue-600 dark:text-blue-300 text-xs">
                  {metadata.twitterDescription || metadata.description || "No description available"}
                </p>
                <div className="flex items-center gap-2">
                  {metadata.favicon && (
                    <div className="relative h-4 w-4 overflow-hidden rounded-sm">
                      <FaviconImage 
                        src={metadata.favicon}
                        alt="Favicon"
                      />
                    </div>
                  )}
                  <p className="text-xs text-blue-500 dark:text-blue-400">{domain}</p>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LinkedIn Preview */}
        <TabsContent value="linkedin" className="p-4">
          <Card className="border border-blue-100 dark:border-zinc-700 overflow-hidden shadow-sm">
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  {metadata.image ? (
                    <ClientImage
                      src={metadata.image}
                      alt={metadata.title || "LinkedIn Preview"}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Globe className="h-16 w-16 text-blue-200 dark:text-zinc-600" />
                    </div>
                  )}
                </div>
                <div className="p-3 border rounded-b-lg border-t-0 border-blue-100 dark:border-zinc-700 bg-blue-50/30 dark:bg-zinc-800/50">
                  <h3 className="text-base font-semibold line-clamp-2 text-blue-700 dark:text-blue-200">{metadata.title || "No title available"}</h3>
                  <p className="text-blue-600 dark:text-blue-300 text-xs line-clamp-2 mt-1">
                    {metadata.description || "No description available"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {metadata.favicon && (
                      <div className="relative h-4 w-4 overflow-hidden rounded-sm">
                        <FaviconImage 
                          src={metadata.favicon}
                          alt="Favicon"
                        />
                      </div>
                    )}
                    <p className="text-xs text-blue-500 dark:text-blue-400">{domain}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}