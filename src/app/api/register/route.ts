import dbConnect from "@/lib/dbConnect";
import User, { Users } from "@/models/User";
import { PassportLocalModel } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const {username, name, email, password} = await req.json();
    try {
        await dbConnect();
        const user = new User({name, email, username});
        const registeredUser = await (User as PassportLocalModel<Users>).register(user, password);
        return Response.json({success: true, data: "User registered successfully"});
    } catch(error: any) {
        let msg;
        if (error.code === 11000) {
            msg = "Duplicate Key!!"
        } else {
            msg = error.message;
        }
        return Response.json({success: false, message: msg});
    }
}