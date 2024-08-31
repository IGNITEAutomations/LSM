import { NextRequest, NextResponse } from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Classes from "@/lib/DB/Classes/classes";

export async function POST(request: NextRequest) {
  try {
    const student = (await request.json()) as {name: string, surname: string, classId: number};

    if (!student.name || !student.surname || !student.classId)
        throw new Error("some data is missing")

    const user = await FirebaseServer.getCurrentUser();
    if (!user) {
        throw new Error("unauthenticated request")
    }

    return NextResponse.json({ success: true, data: await Classes.addNewStudent(student.name, student.surname, student.classId)});

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error: " + (error as Error).message });
  }
}