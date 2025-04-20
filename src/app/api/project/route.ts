import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { projects } from "@/lib/schema";

export async function POST(req: Request){
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                user: null,
                message: "Unauthorized",
                success: false
            },
            {status: 403}
        )
        }

        if(!session?.user?.id){
            return NextResponse.json({
                user: null,
                message: "Unauthorized",
                success: false
            },
            {status: 403}
        )
        }

        const values = await req.json();
        if (!values.domain || !values.name || !values.description) {
            return NextResponse.json(
              { message: "Missing required fields", success: false },
              { status: 400 }
            );
          }

          const exisitingProject = await db.query.projects.findFirst({
            where: (projects, { eq }) => eq(projects.domain, values.domain),
          })

          if (exisitingProject) {
            return NextResponse.json(
              { message: "Domain already exists", success: false },
              { status: 400 }
            );
          }

          const newProject = await db.insert(projects).values({
            domain: values.domain,
            name: values.name,
            description: values.description,
            ownerId: session.user.id,
          })

          revalidatePath("/projects");
            revalidateTag("projects");
        
            return NextResponse.json({
                newProject, message: "Project created successfully", success: true
            }, { status: 201 });
      
    }catch (error) {
        console.log("Error creating project", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
          );
    }
}