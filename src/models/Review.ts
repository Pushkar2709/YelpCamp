import mongoose from "mongoose"

export interface Reviews extends mongoose.Document {
    body: string, 
    rating: number
}

const ReviewSchema = new mongoose.Schema({
    body: String, 
    rating: Number
})

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);