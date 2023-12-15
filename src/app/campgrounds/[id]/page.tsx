import { options } from "@/app/api/auth/[...nextauth]/options";
import Delete from "@/components/Delete";
import { Campgrounds } from "@/models/Campground";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {

    const res = await fetch(`http://localhost:3000/api/campgrounds/${params.id}`, {
        cache: 'no-store',
        credentials: 'include'
    });
    const { success, message, data } = await res.json();
    if (!success) {
        throw new Error(message);
    }
    const campground: Campgrounds = data;

    return (
        <div className="row">
            <div className="col-6 offset-3">
                {/* <Link href={`/campgrounds`} className="btn btn-sm" >&lt;Back</Link> */}
                <Card campground={campground} />
            </div>
        </div>
    )
}

async function Card({ campground }: { campground: Campgrounds }) {

    const session = await getServerSession(options);

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
                <li className="list-group-item">Submitted by {campground.owner?.name}</li>
            </ul>
            {
                session?.user?.email === campground.owner?.email &&
                <div className="card-body d-flex justify-content-between">
                    <Link className="card-link btn btn-info" href={`/campgrounds/${campground._id}/edit`}>Edit</Link>
                    <Delete campgroundId={campground._id} />
                </div>
            }
        </div>
    )
}