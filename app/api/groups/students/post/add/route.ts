import { NextRequest, NextResponse } from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";

export async function POST(request: NextRequest) {
  try {
    const student = (await request.json()) as {name: string, surname: string, groupId: number};

    if (!student.name || !student.surname || !student.groupId)
        throw new Error("some data is missing")

    const user = await FirebaseServer.getCurrentUser();
    if (!user) {
        throw new Error("unauthenticated request")
    }

    return NextResponse.json({ success: true, data: await Groups.addNewStudent(student.name, student.surname, student.groupId)});

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error: " + (error as Error).message });
  }
}