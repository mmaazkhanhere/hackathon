import { SignIn } from "@clerk/nextjs";

interface ISearch {
    redirectUrl?: string;

}

const Page = async ({ searchParams }: { searchParams: ISearch }) => {
    const { redirectUrl } = searchParams
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="container">
                <div className="flex justify-center">
                    <SignIn redirectUrl='/' afterSignInUrl='/' afterSignUpUrl='/sign-in' />
                </div>
            </div>
        </section>
    )
}

export default Page