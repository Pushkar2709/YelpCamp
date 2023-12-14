"use client";
import { Campgrounds } from "@/models/Campground";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface FormData {
    title: string,
    image: string,
    price: number,
    description: string,
    location: string
}

type Props = {
    formData: FormData,
    newCampground: boolean, 
    campgroundId?: string
}

function Form({ formData, newCampground, campgroundId }: Props) {

    const router = useRouter();

    const [form, setForm] = useState({
        title: formData.title, 
        image: formData.image, 
        price: formData.price, 
        description: formData.description, 
        location: formData.location
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name;
        const value = name === "price" ? parseFloat(target.value) : target.value;

        setForm({
            ...form, 
            [name]: value
        })
    }

    const postData = async () => {
        const res = await fetch(`http://localhost:3000/api/campgrounds`, {
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
        const campground: Campgrounds = data;
        router.push(`/campgrounds/${campground._id}`);
    }

    const putData = async () => {
        const res = await fetch(`http://localhost:3000/api/campgrounds/${campgroundId}`, {
            method: 'PUT', 
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
        const campground: Campgrounds = data;
        router.push(`/campgrounds/${campground._id}`);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            e.target.classList.add('was-validated');
            return;
        }
        newCampground ? postData() : putData();
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="mb-3" >
            <div className="mb-3">
                <label className="form-label" htmlFor="title">Title</label>
                <input className="form-control" type="text" id="title" name="title" value={form.title} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="location">Location</label>
                <input className="form-control" type="text" id="location" name="location" value={form.location} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="image">Image Url</label>
                <input className="form-control" type="text" id="image" name="image" value={form.image} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="price">Price</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="price-label">$</span>
                    <input type="number" id="price" className="form-control" name="price" value={form.price} onChange={handleChange} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" value={form.description} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div>
                <button className="btn btn-success">Submit</button>
            </div>
        </form>
    )
}

export default Form