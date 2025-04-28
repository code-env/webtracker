"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { label: "Light", value: "light", icon: <Sun className="h-4 w-4" /> },
  { label: "Dark", value: "dark", icon: <Moon className="h-4 w-4" /> },
  { label: "System", value: "system", icon: <Laptop className="h-4 w-4" /> },
];

export function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            className="rounded-xl border-primary/10"
          >
            {themes.find((t) => t.value === theme)?.icon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "gap-2",
                theme === t.value && "font-semibold text-primary"
              )}
            >
              {t.icon}
              {t.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
