import FormLogin from "@/components/pages/auth/form.login";
import Link from "next/link";
import AuthImgContent from "@/components/pages/auth/auth.img.content";
import AuthWrapper from "@/components/pages/auth/auth.wrapper";

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
                </div>
            </div>

            {/* Image Content */}
            <AuthImgContent title='Login'/>
        </AuthWrapper>
    );
}

export default LoginPage