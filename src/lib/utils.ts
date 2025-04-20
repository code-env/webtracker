import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const countryNames: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",

  // South America
  BR: "Brazil",
  AR: "Argentina",
  CO: "Colombia",
  CL: "Chile",
  PE: "Peru",

  // Europe
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  PL: "Poland",
  RU: "Russia",
  TR: "Turkey",
  PT: "Portugal",
  CH: "Switzerland",
  BE: "Belgium",
  AT: "Austria",
  IE: "Ireland",
  CZ: "Czech Republic",
  HU: "Hungary",
  UA: "Ukraine",
  GR: "Greece",

  // Asia
  IN: "India",
  CN: "China",
  JP: "Japan",
  KR: "South Korea",
  SG: "Singapore",
  MY: "Malaysia",
  ID: "Indonesia",
  TH: "Thailand",
  PH: "Philippines",
  VN: "Vietnam",
  SA: "Saudi Arabia",
  AE: "United Arab Emirates",
  IL: "Israel",
  PK: "Pakistan",
  BD: "Bangladesh",

  // Africa
  ZA: "South Africa",
  NG: "Nigeria",
  EG: "Egypt",
  KE: "Kenya",
  MA: "Morocco",
  GH: "Ghana",
  DZ: "Algeria",
  ET: "Ethiopia",

  // Oceania
  AU: "Australia",
  NZ: "New Zealand",
  FJ: "Fiji",

  // Central America & Caribbean
  CU: "Cuba",
  DO: "Dominican Republic",
  JM: "Jamaica",
  PA: "Panama",
  CR: "Costa Rica",
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
