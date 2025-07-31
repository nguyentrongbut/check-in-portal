import {Button} from "@/components/ui/button";
import Link from "next/link";

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