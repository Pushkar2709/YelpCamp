import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import Campground from "@/models/Campground";
import Review from "@/models/Review";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
    const session = await getServerSession(options);
    if (!session) {
        return Response.json({success: false, message: "You must login first!!"});
    }
    const campgroundId = params.id;
    const data = await req.json();
    const userEmail = session.user?.email;
    try {
        await dbConnect();
        const campground = await Campground.findById(campgroundId);
        if (!campground) {
            return Response.json({success: false, message: "Campground Not Found"});
        }
        const user = await User.findOne({email: userEmail});
        const review = new Review(data);
        review.author = user;
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        return Response.json({success: true, message: "Review submitted!!"});
    } catch(error) {
        console.log(error);
        return Response.json({success: false, message: "Failed to submit review!"});
    }
}