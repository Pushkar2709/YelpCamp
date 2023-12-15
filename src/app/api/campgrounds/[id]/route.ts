import dbConnect from "@/lib/dbConnect";
import Campground from "@/models/Campground";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        await dbConnect();
        const campground = await Campground.findById(params.id).populate('owner');
        if (!campground) {
            return Response.json({success: false, message: "Campground Not Found"});
        }
        return Response.json({success: true, data: campground});
    } catch (error) {
        return Response.json({success: false, message: "Error fetching data from Database"});
    }
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
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
    try {
        await dbConnect();
        await Campground.findByIdAndDelete(params.id);
        return Response.json({success: true});
    } catch(error) {
        return Response.json({success: false, message: "Error in deleting Campground"});
    }
}