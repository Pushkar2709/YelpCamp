"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function RegisterForm() {

    const router = useRouter();

    const [form, setForm] = useState({
        username: "", 
        name: "", 
        email: "", 
        password: ""
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            e.target.classList.add('was-validated');
            return;
        }
        const res = await fetch(`http://localhost:3000/api/register`, {
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
        console.log(success);
        router.push(`/api/auth/signin`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setForm({
            ...form, 
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="mb-3" >
            <div className="mb-3">
                <label className="form-label" htmlFor="username">Username</label>
                <input className="form-control" type="text" id="username" name="username" value={form.username} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-control" type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-control" type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
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
