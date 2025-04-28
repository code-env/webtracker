"use server";

import { db } from "@/lib/db"; 
import { projects } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export const getProjects = async (userId: string) => {
  const res = await db.query.projects.findMany({
    where: eq(projects.ownerId, userId),
    with:{
      analytics: true
    }
  });
  return res;
};

export const getDomainProject = async (domain: string) => {
  const res = await db.query.projects.findFirst({
    where: eq(projects.domain, domain),
  });
  return res;
};

export const getDomainAnalytics = async (domain: string, userId: string) => {
  const res = await db.query.projects.findFirst({
    where: and(eq(projects.domain, domain), eq(projects.ownerId, userId)),
    with: {
      analytics: {
        with: {
          visitHistory: true,
          routeAnalytics: true,
          countryAnalytics: true, 
          deviceAnalytics: true,
          osAnalytics: true,
          sourceAnalytics: true,
          performanceAnalytics: true,
        }
      }
    }
  });
  return res;
};
