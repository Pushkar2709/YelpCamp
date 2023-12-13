import dbConnect from "@/lib/dbConnect"
import Campground, { Campgrounds } from "@/models/Campground";

async function Page({ params }: { params: { id: string } }) {

    await dbConnect();
    const campground: Campgrounds | null = await Campground.findById(params.id);

    return (
        <div className="row">
            <div className="col-6 offset-3">
                <Card campground={campground} />
            </div>
        </div>
    )
}

function Card({ campground }: { campground: Campgrounds | null }) {
    return (
        <div className="card mb-3">
            <img src={campground?.image} className="card-img-top" alt="Campground Image" />
            <div className="card-body">
                <h5 className="card-title">{campground?.title}</h5>
                <p className="card-text">{campground?.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item text-muted">{campground?.location}</li>
                <li className="list-group-item">${campground?.price}/night</li>
            </ul>
            <div className="card-body">
                {/* <Link className="card-link btn btn-info" href={`/campgrounds/${campground._id}/edit`}>Edit</Link>
                <Link className="card-link btn btn-danger" href={`/campgrounds`} onClick={handleDelete}>Delete</Link> */}
            </div>
        </div>
    )
}

export default Page