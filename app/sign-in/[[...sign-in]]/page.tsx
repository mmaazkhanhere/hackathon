import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="container">
                <div className="flex justify-center">
                    <SignIn />
                </div>
            </div>
        </section>
    )
}