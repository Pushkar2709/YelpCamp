import mongoose from "mongoose";
import { Users } from "./User";

export interface Campgrounds extends mongoose.Document {
    title: string, 
    image: string, 
    price: number, 
    description: string, 
    location: string, 
    owner: Users
}

const CampgroundSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    price: Number, 
    description: String, 
    location: String, 
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

export default mongoose.models.Campground || mongoose.model('Campground', CampgroundSchema)