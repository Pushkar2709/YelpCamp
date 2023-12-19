"use client"
import { useRouter } from "next/navigation";

export default function DeleteReview({ reviewId, campgroundId }: { reviewId: string, campgroundId: string }) {

    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/campgrounds/${campgroundId}/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        const { success, message, data } = await res.json();
        if (!success) {
            throw new Error(message);
        }
        router.refresh();
    }

    return (
        <button className="btn btn-sm btn-danger" onClick={handleDelete} >Delete</button>
    )
}
