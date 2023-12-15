import RegisterForm from "@/components/RegisterForm";

export default function Page() {

    return (
        <div>
            <h1 className="text-center">Register</h1>
            <div className="row">
                <div className="col-6 offset-3">
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
