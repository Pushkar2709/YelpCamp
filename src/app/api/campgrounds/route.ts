import dbConnect from "@/lib/dbConnect";
import Campground from "@/models/Campground";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const campgrounds = await Campground.find({});
        return Response.json({success: true, data: campgrounds});
    } catch (error) {
        return Response.json({success: false, message: "Error fetching data from Database"});
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        await dbConnect();
        const campground = await Campground.create(data);
        return Response.json({success: true, data: campground});
    } catch(error) {
        return Response.json({success: false, message: "Error in creating new Campground"});
    }
}