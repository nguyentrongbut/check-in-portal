import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Forgot Password - Local Hunt",
    description:
        "Reset your Local Hunt account password. Enter your email to receive secure password reset instructions.",
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: "Forgot Password - Local Hunt",
        description:
            "Easily reset your password and regain access to your Local Hunt account.",
        url: "https://localhunt.io.vn/forgot-password",
        siteName: "Local Hunt",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Forgot Password - Local Hunt",
        description: "Reset your Local Hunt account password securely.",
    },
};

const ForgotPassword = () => {
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='w-[330px] mx-auto text-center'>
                <h1 className='font-medium text-3xl'>Forgot password?</h1>
                <p className='opacity-60 mt-[10px]'>No worries, we’ll send you reset instruction.</p>

                {/* Form forgot password*/}
                <div className='py-5'>

                </div>

                <Link href='/login'>
                    <Button className='w-full'>
                        Back to Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ForgotPassword