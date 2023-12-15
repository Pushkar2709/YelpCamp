import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

export interface Users extends mongoose.Document {
    username: string, 
    email: string, 
    name: string
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    name: {
        type: String, 
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.models.User || mongoose.model('User', UserSchema);