import AuthImgContent from "@/components/pages/auth/auth.img.content";
import Link from "next/link";
import AuthWrapper from "@/components/pages/auth/auth.wrapper";
import FormRegister from "@/components/pages/auth/form.register";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Register - Local Hunt',
    description: 'Create a Local Hunt account to start running check-in campaigns and engage customers with rewards.',
    alternates: {
        canonical: 'https://localhunt.io.vn/register',
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Register - Local Hunt',
        description: 'Join Local Hunt today and discover the power of location-based marketing.',
        url: 'https://localhunt.io.vn/register',
        siteName: 'Local Hunt',
        images: [
            {
                url: '/og-localhunt.png',
                width: 1200,
                height: 630,
                alt: 'Local Hunt Logo',
            },
        ],
    },
};

const RegisterPage = () => {
    return (
        <AuthWrapper>

            {/* Form Login*/}
            <div className='size-full flex justify-between items-center'>
                <div className='w-[334px] mx-auto'>
                    <h1 className='font-medium text-3xl'>Register</h1>
                    <div className='my-5'>
                        <FormRegister/>
                    </div>
                    <div>
                        <span className='opacity-60'>Already a member?</span>
                        <Link href='/login' className='ml-2 text-primary'>Login</Link>
                        <Link href='/' className='text-center block text-primary underline mt-2'>Back to home</Link>
                    </div>
                </div>
            </div>

            {/* Image Content */}
            <AuthImgContent title='Register'/>
        </AuthWrapper>
    )
}

export default RegisterPage