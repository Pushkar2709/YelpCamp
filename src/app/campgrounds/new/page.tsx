import Form from "@/components/Form"

function Page() {

    const formData = {
        title: "", 
        image: "", 
        price: 0, 
        description: "", 
        location: ""
    }

    return (
        <div>
            <h1 className="text-center">New Campground!</h1>
            <div className="row">
                <div className="col-6 offset-3">
                    <Form formData={formData} newCampground />
                </div>
            </div>
        </div>
    )
}

export default Page