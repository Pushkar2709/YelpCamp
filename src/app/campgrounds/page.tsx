import dbConnect from "@/lib/dbConnect"
import Campground, { Campgrounds } from "@/models/Campground";
import Link from "next/link";

async function Page() {

    await dbConnect();
    const campgrouds: Campgrounds[] = await Campground.find({});

    return (
        <div>
            <h1>All Campgrounds!!</h1>
            {
                campgrouds.map(campground => <Card key={campground._id} campground = {campground} />)
            }
        </div>
    )
}

function Card({campground}: {campground: Campgrounds}) {
    return (
        <div className="card mb-1">
            <div className="row">
                <div className="col-md-4">
                    <img src={campground.image} alt="Campground Image" className="img-fluid" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{campground.title}</h5>
                        <p className="card-text">{campground.description}</p>
                        <p className="card-text">
                            <small className="text-muted">{campground.location}</small>
                        </p>
                        <Link className="btn btn-primary" href={`/campgrounds/${campground._id}`} >View {campground.title}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page