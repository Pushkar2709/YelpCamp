import dbConnect from "@/lib/dbConnect";
import Campground, { Campgrounds } from "@/models/Campground";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const campgrounds = await Campground.find({});
        return Response.json({success: true, data: campgrounds});
    } catch (error) {
        return Response.json({success: false, message: "Error fetching data from Database"});
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(options);
    if (!session) {
        return Response.json({success: false, message: "You must login to create a Campground!!"});
    }
    const data = await req.json();
    const userEmail = session.user?.email;
    try {
        await dbConnect();
        const campground: Campgrounds = await Campground.create(data);
        const user = await User.findOne({email: userEmail});
        campground.owner = user;
        campground.save();
        return Response.json({success: true, data: campground});
    } catch(error) {
        return Response.json({success: false, message: "Error in creating new Campground"});
    }
}