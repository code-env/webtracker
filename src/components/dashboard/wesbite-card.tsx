import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Users, Globe } from "lucide-react";
import Link from "next/link";

interface WebsiteCardProps {
  website: {
    id: string;
    name: string;
    domain: string;
    analytics?: {
      totalVisitors?: number;
      totalPageVisits?: number;
    }
  };
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  return (
    <Link href={`/dashboard/${website.domain}`}>
      <Card className="px-4 hover:ring ring-sky-100/30 group relative overflow-hidden border border-sky-700/20 bg-gradient-to-br from-sky-100 via-white to-sky-50 flex flex-col pb-2 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200/20 via-sky-100/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute -inset-px bg-gradient-to-br from-sky-200/30 via-sky-300/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        <CardHeader className="relative flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            <span className="text-sky-800">
              {website.name}
            </span>
          </CardTitle>
          <Globe className="h-4 w-4 text-sky-500 transition-transform duration-500 group-hover:rotate-12 group-hover:text-sky-400" />
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <span className="text-2xl font-bold tracking-tight text-sky-900">
                {website.analytics?.totalVisitors?.toLocaleString() || '0'}
              </span>
              <span className="flex items-center text-xs text-sky-600">
                <Users className="mr-1 h-3 w-3" />
                <span className="font-medium">Total Visitors</span>
              </span>
            </div>
            <div className="flex flex-col space-y-1.5">
              <span className="text-2xl font-bold tracking-tight text-sky-900">
                {website.analytics?.totalPageVisits?.toLocaleString() || '0'}
              </span>
              <span className="flex items-center text-xs text-sky-600">
                <BarChart2 className="mr-1 h-3 w-3" />
                <span className="font-medium">Total Views</span>
              </span>
            </div>
          </div>
          <div className="absolute inset-0 -translate-x-full rotate-12 transform bg-gradient-to-r from-transparent via-sky-200/20 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
        </CardContent>
      </Card>
    </Link>
  );
}