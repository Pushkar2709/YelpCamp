import Delete from "@/components/Delete";
import { Campgrounds } from "@/models/Campground";
import Link from "next/link";

async function Page({ params }: { params: { id: string } }) {

    const res = await fetch(`http://localhost:3000/api/campgrounds/${params.id}`, {
        cache: 'no-store', 
        credentials: 'include'
    });
    const {success, message, data} = await res.json();
    if (!success) {
        throw new Error(message);
    }
    const campground: Campgrounds = data;

    return (
        <div className="row">
            <div className="col-6 offset-3">
                <Card campground={campground} />
            </div>
        </div>
    )
}

function Card({ campground }: { campground: Campgrounds }) {
    return (
        <div className="card mb-3">
            <img src={campground.image} className="card-img-top" alt="Campground Image" />
            <div className="card-body">
                <h5 className="card-title">{campground.title}</h5>
                <p className="card-text">{campground.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item text-muted">{campground.location}</li>
                <li className="list-group-item">${campground.price}/night</li>
            </ul>
            <div className="card-body d-flex justify-content-between">
                <Link className="card-link btn btn-info" href={`/campgrounds/${campground._id}/edit`}>Edit</Link>
                <Delete campgroundId={campground._id} />
            </div>
        </div>
    )
}

export default Page