import FormLogin from "@/components/pages/auth/form.login";
import Link from "next/link";
import AuthImgContent from "@/components/pages/auth/auth.img.content";
import AuthWrapper from "@/components/pages/auth/auth.wrapper";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Login - Local Hunt',
    description: 'Sign in to your Local Hunt account to manage campaigns, check rewards, and access the merchant dashboard.',
    alternates: {
        canonical: 'https://localhunt.io.vn/login',
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Login - Local Hunt',
        description: 'Access your Local Hunt account securely.',
        url: 'https://localhunt.io.vn/login',
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

const LoginPage =  () => {

    return (
        <AuthWrapper>
            {/* Form Login*/}
            <div className='size-full flex justify-between items-center'>
                <div className='w-[334px] mx-auto'>
                    <h1 className='font-medium text-3xl'>Login</h1>
                    <p className='text-sm mt-2.5 opacity-60'>How do i get started lorem ipsum dolor at?</p>
                    <div className='my-5'>
                        <FormLogin/>
                    </div>
                    <div className='text-center'>
                        <span className='opacity-60'>Dont&apos;t have an account.</span>
                        <Link href='/register' className='ml-2 text-primary'>Register</Link>
                    </div>
                    <Link href='/' className='text-center block text-primary underline mt-2'>Back to home</Link>
                </div>
            </div>

            {/* Image Content */}
            <AuthImgContent title='Login'/>
        </AuthWrapper>
    );
}

export default LoginPage