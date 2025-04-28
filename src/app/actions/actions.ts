"use server";

import { auth } from "@/auth";
import { getDomainAnalytics, getDomainProject, getProjects } from "./db_calls";

export const getAllProjects = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  try {
    const projects = await getProjects(id);
    return projects || [];
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
  };
  
  export const getProjectByDomain = async (domain: string | null) => {
   
  if (!domain) {
    return null;
  }
  try {
    const res = await getDomainProject(domain);
    return res;
  } catch (error) {
    console.error(`Error fetching project for domain ${domain}:`, error);
    return null;
  }
  };
  
  export const getAnalytics = async (domain: string | null) => {
  if (!domain) {
    return null;
  }
  const session = await auth();

  if(!session || !session.user) {
    return {status: 401, response: null, message: "Unauthorized"};
  }
const userId = session?.user.id as string;

  try {
    const res = await getDomainAnalytics(domain, userId);
    if(res){
      return {status: 200, response: res};
    }else{
      return {status: 403, response: null};
    }

  } catch (error) {
    console.error(`Error fetching analytics for domain ${domain}:`, error);
    return {status: 500, response: null};
  }
  };
