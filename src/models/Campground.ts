import mongoose from "mongoose";
import User, { Users } from "./User";
import Review, { Reviews } from "./Review";

export interface Campgrounds extends mongoose.Document {
    title: string, 
    image: string, 
    price: number, 
    description: string, 
    location: string, 
    owner: Users, 
    reviews: [Reviews]
}

const CampgroundSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    price: Number, 
    description: String, 
    location: String, 
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    }, 
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: Review
    }]
})

export default mongoose.models.Campground || mongoose.model('Campground', CampgroundSchema)