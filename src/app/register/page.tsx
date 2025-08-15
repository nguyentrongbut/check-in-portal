import AuthImgContent from "@/components/pages/auth/auth.img.content";
import Link from "next/link";
import AuthWrapper from "@/components/pages/auth/auth.wrapper";
import FormRegister from "@/components/pages/auth/form.register";

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