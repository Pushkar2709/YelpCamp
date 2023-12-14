import Form from "@/components/Form";
import { Campgrounds } from "@/models/Campground"

async function Page({params}: {params: {id: string}}) {

    const res = await fetch(`http://localhost:3000/api/campgrounds/${params.id}`, {cache: 'no-store'});
    const {success, message, data} = await res.json();
    if (!success) {
        throw new Error(message);
    }

    const campground: Campgrounds = data;

    const formData = {
        title: campground.title, 
        image: campground.image, 
        price: campground.price, 
        description: campground.description, 
        location: campground.location
    }

    return (
        <div>
            <h1 className="text-center">New Campground!</h1>
            <div className="row">
                <div className="col-6 offset-3">
                    <Form formData={formData} newCampground={false} campgroundId={campground._id} />
                </div>
            </div>
        </div>
    )
}

export default Page