import {NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import User from "@/lib/DB/User/user";
import { json2csv } from 'json-2-csv';
import ModelResume from "@/lib/DB/Resume/model";

export async function GET() {
    try {
        const firebaseUser = await FirebaseServer.getCurrentUser()
        if (!firebaseUser)
            throw new Error("getting user credentials")

        const userData = await User.user(firebaseUser.email!)
        if (!userData)
            throw new Error("user not found in bd")

        const csv = json2csv(await ModelResume.resume())
        return new Response(csv, {
            status: 200,
            headers: {'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="resume.csv"'}
        })
    } catch (error) {
        console.error("Error: " + error)
        await FirebaseServer.signOut()
        return NextResponse.json({success: false, error: (error as Error).message})
    }
}