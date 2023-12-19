import mongoose from "mongoose"
import User, { Users } from "./User";

export interface Reviews extends mongoose.Document {
    body: string, 
    rating: number, 
    author: Users
}

const ReviewSchema = new mongoose.Schema({
    body: String, 
    rating: Number, 
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    }
})

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);