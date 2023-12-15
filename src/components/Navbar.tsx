import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import LogOut from "./LogOut";

async function Navbar() {

    const session = await getServerSession(options);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">YelpCamp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link href={`/`} className="btn btn-dark">Home</Link>
                        <Link href={`/campgrounds`} className="btn btn-dark">Campgrounds</Link>
                        <Link href={`/campgrounds/new`} className="btn btn-dark">New Campground</Link>
                    </div>
                    {
                        session
                            ? <div className="navbar-nav">
                                <span className="btn btn-dark">{session.user?.name}</span>
                                <button className="btn btn-dark"><LogOut /></button>
                            </div>
                            : <div className="navbar-nav">
                                <Link href={`/api/auth/signin`} className="btn btn-dark">Login</Link>
                                <Link href={`/register`} className="btn btn-dark">Register</Link>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar