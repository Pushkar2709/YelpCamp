import Link from "next/link"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">YelpCamp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link href={`/`} className="nav-link">Home</Link>
                        <Link href={`/campgrounds`} className="nav-link">Campgrounds</Link>
                        <Link href={`/campgrounds/new`} className="nav-link">New Campground</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar