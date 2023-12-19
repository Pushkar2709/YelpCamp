import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import Campground, { Campgrounds } from "@/models/Campground";
import Review from "@/models/Review";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function DELETE(rew: NextRequest, {params}: {params: {id: string, reviewId: string}}) {
    const session = await getServerSession(options);
    if (!session) {
        return Response.json({success: false, message: "You must login first!!"});
    }
    try {
        await dbConnect();
        const campground = await Campground.findById(params.id);
        if (!campground) {
            return Response.json({success: false, message: "Campground Not Found"});
        }
        const review = await Review.findById(params.reviewId);
        if (!review) {
            return Response.json({success: false, message: "Review Not Found"});
        }
        await Campground.findByIdAndUpdate(params.id, {$pull: {reviews: params.reviewId}});
        await Review.findByIdAndDelete(params.reviewId);
        return Response.json({success: true, message: "Review Deleted!"});
    } catch(error) {
        Response.json({success: false, message: "Error in deleting Review"})
    }
}