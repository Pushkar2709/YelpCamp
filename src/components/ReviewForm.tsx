"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ReviewForm({campgroundId}: {campgroundId: string}) {

    const router = useRouter();

    const [form, setForm] = useState({
        rating: 1,
        body: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name;
        const value = name === "rating" ? parseInt(target.value) : target.value;

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            e.target.classList.add('was-validated');
            return;
        }
        const res = await fetch(`http://localhost:3000/api/campgrounds/${campgroundId}/reviews`, {
            method: 'POST', 
            headers: {
                'Accept': 'appliaction/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(form)
        })
        const {success, message, data} = await res.json();
        if (!success) {
            throw new Error(message);
        }
        router.refresh();
    }

    return (
        <div>
            <h3>Leave a review!</h3>
            <form onSubmit={handleSubmit} noValidate className="mb-3">
                <fieldset className="starability-growRotate">
                    <input type="radio" id="first-rate1" name="rating" value="1" checked={form.rating === 1} onChange={handleChange} />
                    <label htmlFor="first-rate1" title="Terrible">1 star</label>
                    <input type="radio" id="first-rate2" name="rating" value="2" checked={form.rating === 2} onChange={handleChange} />
                    <label htmlFor="first-rate2" title="Not good">2 stars</label>
                    <input type="radio" id="first-rate3" name="rating" value="3" checked={form.rating === 3} onChange={handleChange} />
                    <label htmlFor="first-rate3" title="Average">3 stars</label>
                    <input type="radio" id="first-rate4" name="rating" value="4" checked={form.rating === 4} onChange={handleChange} />
                    <label htmlFor="first-rate4" title="Very good">4 stars</label>
                    <input type="radio" id="first-rate5" name="rating" value="5" checked={form.rating === 5} onChange={handleChange} />
                    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                </fieldset>
                <div className="mb-3">
                    <label className="form-label" htmlFor="body">Comment</label>
                    <textarea className="form-control" id="body" name="body" value={form.body} required onChange={handleChange} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div>
                    <button className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}
