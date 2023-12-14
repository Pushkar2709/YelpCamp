"use client"
import { useRouter } from "next/navigation"

function Delete({campgroundId}: {campgroundId: string}) {

    const router = useRouter()

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/campgrounds/${campgroundId}`, {
            method: 'DELETE'
        });
        const {success, message, data} = await res.json();
        if (!success) {
            throw new Error(message);
        }
        router.push(`/campgrounds`);
    }

    return (
        <button className="btn btn-danger" onClick={handleDelete} >Delete</button>
    )
}

export default Delete