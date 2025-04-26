import { auth } from "@/auth";
import {eq, not, and, desc} from "drizzle-orm"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { bugReports } from "@/lib/schema";

// Planning to add UI for bug reports in the future
// Currently, this is just the API route
export async function POST(req: Request) {
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json(
                {message: "Unauthorized", success: false},
                {status: 403}
            )
        }

        if(!session.user?.id){
            return NextResponse.json(
                {message: "User not found", success: false},
                {status: 404}
            )
        }

        const { title, description }: { title?: string; description?: string } = await req.json();

        if (!title || !description) {
            return NextResponse.json(
                { message: "Title, description, and user ID are required", success: false },
                { status: 400 }
            );
        }

        const bugReportsSubmission = await db.insert(bugReports).values({
            title: title,
            description: description,
            ownerId: Number(session.user.id)
        });

        revalidatePath("/settings/bug-reports");
        return NextResponse.json(
            {bugReportsSubmission, message: "Bug report submitted successfully", success: true},
            { status: 200 }
        )
    }catch (error) {
        console.error("Error submitting bug report:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}

export async function GET(){
    try{
        const session = await auth();
        if(!session || !session.user?.id){
            return NextResponse.json(
                {message: "Unauthorized", success: false},
                {status: 403}
            )
        }

        const allBugReports = await db
            .select()
            .from(bugReports)
            .where(
                and(
                eq(bugReports.ownerId, Number(session.user.id)),
                not(eq(bugReports.status, "inReview"))
                )
            )
            .orderBy(desc(bugReports.createdAt));
        

        return NextResponse.json({
            allBugReports,
            message: "Bug reports fetched successfully",
            success: true
        }, {status: 200})

} catch (error) {
        console.error("Error fetching bug reports:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}