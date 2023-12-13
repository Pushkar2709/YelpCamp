import CampgroundForm from "@/components/CampgroundForm";
import { Campgrounds } from "@/models/Campground"

async function Page({params}: {params: {id: string}}) {

    const res = await fetch(`http://localhost:3000/api/campgrounds/${params.id}`, {cache: 'no-store'});
    const response = await res.json();
    if (!response.success) {
        throw new Error(response.message);
    }

    const campground: Campgrounds = response.data;

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
                    <CampgroundForm formData={formData} newCampground={false} campgroundId={campground._id} />
                </div>
            </div>
        </div>
    )
}

export default Page