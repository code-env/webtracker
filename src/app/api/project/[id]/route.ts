import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { and, eq } from "drizzle-orm";
import { projects } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          user: null,
          message: "Unauthorized",
          success: false,
        },
        { status: 403 }
      );
    }

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          user: null,
          message: "Unauthorized",
          success: false,
        },
        { status: 403 }
      );
    }

    const deletedProject = await db
      .delete(projects)
      .where(and(eq(projects.id, id), eq(projects.ownerId, session.user.id)));
    if (deletedProject.count === 0) {
      return NextResponse.json(
        { message: "Project not found", success: false },
        { status: 404 }
      );
    }

    revalidatePath("/projects");
    revalidateTag("projects");

    return NextResponse.json(
      { message: "Project deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    revalidatePath("/dashboard/projects");
    return NextResponse.json(
      { message: "Project deleted successfully", success: true },
      { status: 200 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();

        if(!session) {
            return NextResponse.json(
                {
                    user: null,
                    message: "Unauthorized",
                    success: false,
                },
                { status: 403 }
            );
        }
        if(!session?.user?.id) {
            return NextResponse.json(
                {
                    user: null,
                    message: "Unauthorized",
                    success: false,
                },
                { status: 403 }
            );
        }

        const values = await req.json();
        if (!values.domain || !values.name || !values.description) {
            return NextResponse.json(
                { message: "Missing required fields", success: false },
                { status: 400 }
            );
        }
        const existingProject = await db.query.projects.findFirst({
            where: (projects, { eq }) => eq(projects.domain, values.domain),
        });

        if (existingProject && existingProject.id !== id) {
            return NextResponse.json(
                { message: "Domain already exists", success: false },
                { status: 400 }
            );
        }

        const updatedProject = await db
            .update(projects)
            .set({
                domain: values.domain,
                name: values.name,
                description: values.description,
            })
            .where(and(eq(projects.id, id), eq(projects.ownerId, session.user.id)));
        revalidatePath("/projects");
        revalidateTag("projects");

        return NextResponse.json(
            { project: updatedProject ,message: "Project updated successfully", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error updating project", error);
        return NextResponse.json(
            { message: "Error updating project", success: false },
            { status: 500 }
        );
        
    }
}
