import dbConnect from "@/lib/dbConnect";
import Campground from "@/models/Campground";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        await dbConnect();
        const campground = await Campground.findById(params.id).populate('owner').populate('reviews');
        if (!campground) {
            return Response.json({success: false, message: "Campground Not Found"});
        }
        return Response.json({success: true, data: campground});
    } catch (error) {
        console.log(error);
        return Response.json({success: false, message: "Error fetching data from Database"});
    }
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const session = await getServerSession(options);
    if (!session) {
        return Response.json({success: false, message: "You must login first!!"});
    }
    const data = await req.json();
    try {
        await dbConnect();
        const campground = await Campground.findByIdAndUpdate(params.id, data, {new: true, runValidators: true});
        return Response.json({success: true, data: campground});
    } catch(error) {
        return Response.json({success: false, message: "Error in updating Campground"});
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    const session = await getServerSession(options);
    if (!session) {
        return Response.json({success: false, message: "You must login first!!"});
    }
    try {
        await dbConnect();
        await Campground.findByIdAndDelete(params.id);
        return Response.json({success: true});
    } catch(error) {
        return Response.json({success: false, message: "Error in deleting Campground"});
    }
}