import mongoose from "mongoose";

export interface Campgrounds extends mongoose.Document {
    title: string, 
    image: string, 
    price: number, 
    description: string, 
    location: string
}

const CampgroundSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    price: Number, 
    description: String, 
    location: String
})

export default mongoose.models.Campground || mongoose.model('Campground', CampgroundSchema)